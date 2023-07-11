"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const express_1 = __importDefault(require("express"));
const GetLoginDetails_1 = require("./controllers/GetLoginDetails");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/login", async (req, res) => {
    const data = req.body;
    try {
        if (!data.userId || !data.token) {
            res.status(400).json({ error: `You are either missing user id or user token` });
        }
        else {
            const result = await (0, GetLoginDetails_1.loginDetails)(data);
            res.status(200).json({ message: result });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(3000, () => {
    console.log('App is ready');
});
//# sourceMappingURL=index.js.map