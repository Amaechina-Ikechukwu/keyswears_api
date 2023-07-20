import express, { Request, Response } from "express";
import "dotenv/config";
const router = express.Router();
router.get("/pages/webhook", (req: Request, res: Response) => {
  if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});
router.post("/pages/webhook", (req: any, res: any) => {
  const body = req.body;
  if (body.object === "page" && body.entry) {
    for (const entry of body.entry) {
      if (entry.changes) {
        for (const change of entry.changes) {
          console.log({ ...change });

          // if (change.field === 'feed' && change.value && change.value.item === 'comment') {
          //   const comment = change.value;
          //   console.log('New comment:', comment);
          //   // Take any desired actions based on the received comment information
          // }
        }
      }
    }
  }
});
export default router;
