import { Router, Request, Response } from "express";
import checkRequestBodyWithParams from "../CheckBody";
import { loginDetails } from "../../controllers/GetLoginDetails";
import GetUserPages from "../../controllers/Pages/GetListOfPages";
import SubscribePages from "../../controllers/Pages/SubscribePage";
import { v4 as uuidv4 } from "uuid";
const pages = new GetUserPages();
const subscribePage = new SubscribePages();
const router = Router();
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
router.get(
  "/listofpages",
  checkRequestBodyWithParams("userId", "token"),
  async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const result = await pages.ListOfPages(body.userId, body.token);
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
  checkRequestBodyWithParams("subscribed_fields", "token"),
  async (req: Request, res: Response) => {
    const body = req.body;
    try {
      const result = await subscribePage.PagesToSubscribe(
        body.subscribed_fields,
        body.token
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);
export default router;
