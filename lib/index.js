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
//@ts-ignore
const express_1 = __importDefault(require("express"));
const GetLoginDetails_1 = require("./controllers/GetLoginDetails");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://5a37-129-205-113-166.ngrok-free.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (!data.userId || !data.token) {
            res.status(400).json({ error: `You are either missing user id or user token` });
        }
        else {
            const result = yield (0, GetLoginDetails_1.loginDetails)(data);
            res.status(200).json({ message: result });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get("/webhook", (req, res) => {
    if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    }
    else {
        res.sendStatus(403);
    }
});
app.post("/webhook", (req, res) => {
    const body = req.body;
    if (body.object === 'page' && body.entry) {
        for (const entry of body.entry) {
            if (entry.changes) {
                for (const change of entry.changes) {
                    if (change.field === 'feed' && change.value && change.value.item === 'comment') {
                        const comment = change.value;
                        console.log('New comment:', comment);
                        // Take any desired actions based on the received comment information
                    }
                }
            }
        }
    }
});
app.listen(3000, () => {
    console.log('App is ready');
});
//# sourceMappingURL=index.js.map