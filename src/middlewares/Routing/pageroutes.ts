import { Router, Request, Response, NextFunction } from "express";
import checkRequestBodyWithParams from "../CheckBody";
import { loginDetails } from "../../controllers/GetLoginDetails";
import GetListOfPages from "../../controllers/Pages/GetListOfPages";
import SubscribePages from "../../controllers/Pages/SubscribePage";
import { v4 as uuidv4 } from "uuid";
import insertValueToArrayColumn from "../../actions/Pages/AnotherUserPages";
import UserId from "../../actions/Pages/GetUserId";
import { UserProfileInformation } from "../../actions/Pages/UserProfileInformation";
import RecordPageWebhooks from "../../actions/Pages/RecordWebhook";
import validateUUIDMiddleware from "../ValidatedUUIDHeader";
import UserPages from "../../controllers/Pages/GetUserPages";
import VerifyToken from "../JWTVerify";
import ReplyComment from "../../controllers/Pages/ReplyComment";

import supabase from "../../../supabase";
import GetCommentersProfile from "../../actions/Pages/GetCommentersProfile";
const pages = new GetListOfPages();
const userid = new UserId();
const userpages = new UserPages();
const subscribePage = new SubscribePages();
const pageWebhooks = new RecordPageWebhooks();
const userProfileInformation = new UserProfileInformation("v18.0");
const router = Router();
// Extend the Request interface to include a 'uuid' property
declare global {
  namespace Express {
    interface Request {
      uuid?: string;
      redirectUri?: string;
    }
  }
}

router.use((req: Request, res: Response, next: NextFunction) => {
  const { redirectUri } = req.query;
  if (redirectUri) {
    req.redirectUri = redirectUri as string;
  }
  next();
});
router.post(
  "/login",
  checkRequestBodyWithParams("userId", "token"),
  async (req: Request, res: Response) => {
    const data = req.body;
    const newUUID = uuidv4();
    try {
      const result = await loginDetails(data, newUUID);
      res.status(200).json({ message: result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);
router.post("/rpc", async (req: Request, res: Response) => {
  const { table_name } = req.body;
  try {
    let { data, error } = await supabase.rpc("enable_realtime_for_table", {
      table_name,
    });

    if (error) console.error(error);
    else console.log(data);

    res.status(200).json({ message: error });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
///////requiresuserid//////
const returnUserId = async (uuid: any) => {
  const uid = await userid.GetUserId(uuid);
  return uid;
};
router.get(
  "/uuid",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.uuid);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/userid",
  validateUUIDMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userid: any = await returnUserId(req.uuid);

      res.status(200).json(userid);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/listofpages",
  validateUUIDMiddleware, // Apply the custom UUID validation middleware
  async (req: Request, res: Response) => {
    try {
      const userid: any = await returnUserId(req.uuid);
      const result = await pages.ListOfPages(userid, req.uuid || "");
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/getuserpages",
  validateUUIDMiddleware, // Apply the custom UUID validation middleware
  async (req: Request, res: Response) => {
    try {
      const result = await userpages.GetUserPages(req.uuid || "");
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/userinfo",
  validateUUIDMiddleware, // Apply the custom UUID validation middleware
  async (req: Request, res: Response) => {
    try {
      const result = await userProfileInformation.getPersonData(req.uuid);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
router.get(
  "/commentersinfo",
  validateUUIDMiddleware, // Apply the custom UUID validation middleware
  async (req: Request, res: Response) => {
    try {
      const { psid, pagename } = req.body;
      const result = await GetCommentersProfile(psid, pagename);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

router.post(
  "/subscribe",
  checkRequestBodyWithParams("pages", "uuid"),
  async (req: Request, res: Response) => {
    const body = req.body;
    const pages = body.pages;
    const uuid = body.uuid;

    try {
      const verifiedToken = await VerifyToken(uuid);

      await Promise.all(
        pages.map(async (page: any) => {
          await subscribePage.PagesToSubscribe(page);
          await insertValueToArrayColumn(page, verifiedToken.uuid);
        })
      );

      res.status(200).json({ message: "done" });
    } catch (error) {
      console.error("Error in /subscribe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
router.post(
  "/replycomment",
  checkRequestBodyWithParams("pageid", "message", "commentid"),
  async (req: Request, res: Response) => {
    const body = req.body;

    try {
      const result = await new ReplyComment().Reply(body);

      res.status(200).json({ message: result });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

router.post("/recordpagewebhook", async (req: Request, res: Response) => {
  const body: { uuid: string; pagedata: string[] } = req.body;
  const userid: any = await returnUserId(body.uuid);
  try {
    const result = await pageWebhooks.PageChanges(userid, body.pagedata);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
