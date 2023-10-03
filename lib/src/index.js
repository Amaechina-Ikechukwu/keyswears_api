"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PageWebhook_1 = __importDefault(require("./webhooks/PageWebhook"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Enable CORS to allow all origins, methods, and headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow specified HTTP methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specified headers
    next();
});
////////////////////////////////
app.use("/", PageWebhook_1.default);
// Add your other middleware and routes here
////////////////////////////////
app.listen(port, () => {
    console.log("App is ready");
});
//# sourceMappingURL=index.js.map