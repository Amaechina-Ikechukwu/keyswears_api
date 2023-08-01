"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const RecordWebhook_1 = __importDefault(require("../actions/Pages/RecordWebhook"));
const GetOwnerOfPage_1 = __importDefault(require("../actions/Pages/GetOwnerOfPage"));
const GetUserId_1 = __importDefault(require("../actions/Pages/GetUserId"));
const router = express_1.default.Router();
const recordpagewebhook = new RecordWebhook_1.default();
const pageOwner = new GetOwnerOfPage_1.default();
const getuserid = new GetUserId_1.default();
router.get("/pages/webhook", (req, res) => {
    if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    }
    else {
        res.sendStatus(403);
    }
});
router.post("/pages/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    if (body.object === "page" && body.entry) {
        for (const entry of body.entry) {
            if (entry.changes) {
                for (const change of entry.changes) {
                    const pageid = (_a = change.value.post_id) === null || _a === void 0 ? void 0 : _a.split("_")[0];
                    const owneruuid = yield pageOwner.PageOwner(pageid);
                    console.log(change);
                    const owner = yield getuserid.GetUserId(owneruuid);
                    try {
                        yield recordpagewebhook.PageChanges(owner, change);
                        return;
                    }
                    catch (error) {
                        console.log(error);
                        return;
                    }
                }
            }
        }
    }
}));
exports.default = router;
//# sourceMappingURL=PageWebhook.js.map