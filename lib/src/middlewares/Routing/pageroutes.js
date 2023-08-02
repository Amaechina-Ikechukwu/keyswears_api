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
const express_1 = require("express");
const CheckBody_1 = __importDefault(require("../CheckBody"));
const GetLoginDetails_1 = require("../../controllers/GetLoginDetails");
const GetListOfPages_1 = __importDefault(require("../../controllers/Pages/GetListOfPages"));
const SubscribePage_1 = __importDefault(require("../../controllers/Pages/SubscribePage"));
const uuid_1 = require("uuid");
const AnotherUserPages_1 = __importDefault(require("../../actions/Pages/AnotherUserPages"));
const GetUserId_1 = __importDefault(require("../../actions/Pages/GetUserId"));
const RecordWebhook_1 = __importDefault(require("../../actions/Pages/RecordWebhook"));
const ValidatedUUIDHeader_1 = __importDefault(require("../ValidatedUUIDHeader"));
const GetUserPages_1 = __importDefault(require("../../controllers/Pages/GetUserPages"));
const JWTVerify_1 = __importDefault(require("../JWTVerify"));
const pages = new GetListOfPages_1.default();
const userid = new GetUserId_1.default();
const userpages = new GetUserPages_1.default();
const subscribePage = new SubscribePage_1.default();
const pageWebhooks = new RecordWebhook_1.default();
const router = (0, express_1.Router)();
router.post("/login", (0, CheckBody_1.default)("userId", "token"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newUUID = (0, uuid_1.v4)();
    try {
        const result = yield (0, GetLoginDetails_1.loginDetails)(data, newUUID);
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
///////requiresuserid//////
const returnUserId = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = yield userid.GetUserId(uuid);
    return uid;
});
router.get("/listofpages", ValidatedUUIDHeader_1.default, // Apply the custom UUID validation middleware
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = yield returnUserId(req.uuid);
        const result = yield pages.ListOfPages(userid, req.uuid || "");
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/getuserpages", ValidatedUUIDHeader_1.default, // Apply the custom UUID validation middleware
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userpages.GetUserPages(req.uuid || "");
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/subscribe", (0, CheckBody_1.default)("pages", "uuid"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const pages = body.pages;
    const verifiedToken = yield (0, JWTVerify_1.default)(body.uuid);
    try {
        yield pages.map((page) => __awaiter(void 0, void 0, void 0, function* () {
            yield subscribePage.PagesToSubscribe(page);
            yield (0, AnotherUserPages_1.default)(page, verifiedToken.uuid);
        }));
        res.status(200).json({ message: "done" });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/recordpagewebhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userid = yield returnUserId(body.uuid);
    try {
        const result = yield pageWebhooks.PageChanges(userid, body.pagedata);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=pageroutes.js.map