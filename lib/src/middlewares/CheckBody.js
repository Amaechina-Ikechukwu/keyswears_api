"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to check if userId and token are present in the request body
const checkRequestBodyWithParams = (param1, param2) => {
    return (req, res, next) => {
        const data = req.body;
        if (!data.hasOwnProperty(param1) || !data.hasOwnProperty(param2)) {
            res.status(400).json({ error: `You are missing ${param1} or ${param2}` });
        }
        // Call next() only when both parameters are present to proceed to the next middleware/route handler.
        next();
    };
};
exports.default = checkRequestBodyWithParams;
//# sourceMappingURL=CheckBody.js.map