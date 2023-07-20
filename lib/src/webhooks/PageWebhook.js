"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router = express_1.default.Router();
router.get("/pages/webhook", (req, res) => {
    if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    }
    else {
        res.sendStatus(403);
    }
});
router.post("/pages/webhook", (req, res) => {
    const body = req.body;
    if (body.object === "page" && body.entry) {
        for (const entry of body.entry) {
            if (entry.changes) {
                for (const change of entry.changes) {
                    console.log(Object.assign({}, change));
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
exports.default = router;
//# sourceMappingURL=PageWebhook.js.map