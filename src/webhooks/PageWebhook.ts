import express, { Request, Response } from "express";
import "dotenv/config";
import RecordPageWebhooks from "../actions/Pages/RecordWebhook";
import GetOwnerOfThePage from "../actions/Pages/GetOwnerOfPage";
import UserId from "../actions/Pages/GetUserId";
const router = express.Router();
const recordpagewebhook = new RecordPageWebhooks();
const pageOwner = new GetOwnerOfThePage();
const getuserid = new UserId();
router.get("/pages/webhook", (req: Request, res: Response) => {
  if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});
router.post("/pages/webhook", async (req: any, res: any) => {
  const body = req.body;
  if (body.object === "page" && body.entry) {
    for (const entry of body.entry) {
      if (entry.changes) {
        for (const change of entry.changes) {
          const pageid =change.value.post_id?.split("_")[0];

          const owneruuid = await pageOwner.PageOwner(pageid);
          console.log(change);
          const owner = await getuserid.GetUserId(owneruuid);
          try {
            await recordpagewebhook.PageChanges(owner, change);
            return;
          } catch (error: any) {
            console.log(error);
            return;
          }
        }
      }
    }
  }
});

export default router;
