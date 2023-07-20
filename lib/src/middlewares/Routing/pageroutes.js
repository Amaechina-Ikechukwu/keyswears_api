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
const pages = new GetListOfPages_1.default();
const subscribePage = new SubscribePage_1.default();
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
router.get("/listofpages", (0, CheckBody_1.default)("uuid", "token"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result = yield pages.ListOfPages(body.userId, body.token);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/subscribe", (0, CheckBody_1.default)("subscribed_fields", "token"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result = yield subscribePage.PagesToSubscribe(body.subscribed_fields, body.token);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/adduserpages", (0, CheckBody_1.default)("pages", "uuid"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const result = yield (0, AnotherUserPages_1.default)(body.pages, body.uuid);
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