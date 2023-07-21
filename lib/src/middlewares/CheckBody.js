"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to check if specified parameters are present in the request body
const checkRequestBodyWithParams = (...params) => {
    return (req, res, next) => {
        const data = req.body;
        const missingParams = [];
        // Check if each parameter is present in the request body
        for (const param of params) {
            if (!data.hasOwnProperty(param)) {
                missingParams.push(param);
            }
        }
        // If any parameter is missing, send a 400 Bad Request response with the missing parameter names
        if (missingParams.length > 0) {
            res
                .status(400)
                .json({
                error: `You are missing the following parameters: ${missingParams.join(", ")}`,
            });
        }
        else {
            // Call next() only when all specified parameters are present to proceed to the next middleware/route handler.
            next();
        }
    };
};
exports.default = checkRequestBodyWithParams;
//# sourceMappingURL=CheckBody.js.map