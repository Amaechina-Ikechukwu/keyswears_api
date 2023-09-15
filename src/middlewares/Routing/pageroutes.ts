import { Router, Request, Response } from "express";
import checkRequestBodyWithParams from "../CheckBody";
import { loginDetails } from "../../controllers/GetLoginDetails";
import GetListOfPages from "../../controllers/Pages/GetListOfPages";
import SubscribePages from "../../controllers/Pages/SubscribePage";
import { v4 as uuidv4 } from "uuid";
import insertValueToArrayColumn from "../../actions/Pages/AnotherUserPages";
import UserId from "../../actions/Pages/GetUserId";
import RecordPageWebhooks from "../../actions/Pages/RecordWebhook";
import validateUUIDMiddleware from "../ValidatedUUIDHeader";
import UserPages from "../../controllers/Pages/GetUserPages";
import VerifyToken from "../JWTVerify";
import ReplyComment from "../../controllers/Pages/ReplyComment";
const pages = new GetListOfPages();
const userid = new UserId();
const userpages = new UserPages();
const subscribePage = new SubscribePages();
const pageWebhooks = new RecordPageWebhooks();
const router = Router();
// Extend the Request interface to include a 'uuid' property
declare global {
  namespace Express {
    interface Request {
      uuid?: string;
    }
  }
}
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
///////requiresuserid//////
const returnUserId = async (uuid: any) => {
  const uid = await userid.GetUserId(uuid);
  return uid;
};
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

router.post(
  "/subscribe",
  checkRequestBodyWithParams("pages", "uuid"),
  async (req: Request, res: Response) => {
    const body = req.body;
    const pages = body.pages;
    const verifiedToken = await VerifyToken(body.uuid);
    try {
      await pages.map(async (page: any) => {
        await subscribePage.PagesToSubscribe(page);

        await insertValueToArrayColumn(page, verifiedToken.uuid);
      });

      res.status(200).json({ message: "done" });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
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
