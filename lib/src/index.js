"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const express_1 = __importDefault(require("express"));
const PageWebhook_1 = __importDefault(require("./webhooks/PageWebhook"));
require("dotenv/config");
const app = (0, express_1.default)();
const pageroutes_1 = __importDefault(require("./middlewares/Routing/pageroutes"));
app.use(express_1.default.json());
app.use((req, res, next) => {
    const allowedOrigins = ["https://chooyagroup.com"];
    const origin = req.headers.origin;
    // Check if the request origin is in the allowed origins list
    if (origin && allowedOrigins.includes(origin)) {
        // Allow the specific origin
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    else {
        // For any other origin (except localhost), allow it
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
////////////////////////////////
app.use("/", PageWebhook_1.default);
app.use("/", pageroutes_1.default);
////////////////////////////////
app.listen(3001, () => {
    console.log("App is ready");
});
//# sourceMappingURL=index.js.map