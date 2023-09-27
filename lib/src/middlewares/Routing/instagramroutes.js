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
const axios_1 = __importDefault(require("axios")); // Import the axios library
require("dotenv/config");
const router = (0, express_1.Router)();
const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Google Sign-In</title>
    </head>
    <body class="container mx-auto p-4 px-10">
    <div class="w-full h-full  sm:px-20  items-center justify-center"><h1  class=" bg-black text-gray-200 rounded-xl shadow-xl py-4 px-4 font-bold transition duration-300 transform hover:scale-105 hover:ring-light-accent focus:outline-none ring ring-gray-300">
        Connection Succeeded
      </h1></div>
      

   
    </body>
    </html>
  `;
const REDIRECT_URI = "https://lio-uec9.onrender.com/confirmed";
router.get("/confirm", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        const appId = process.env.IG_ID;
        const appSecret = process.env.IG_SECRET;
        const redirectUri = REDIRECT_URI;
        // Make a POST request to Instagram's OAuth access token endpoint
        const response = yield axios_1.default.post("https://api.instagram.com/oauth/access_token", null, {
            params: {
                client_id: appId,
                client_secret: appSecret,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
                code: code,
            },
        });
        const result = response.data.access_token;
        console.log(result);
        res.json({ access_token: result }); // Return the access token in the response
    }
    catch (error) {
        console.error("Error while fetching Instagram access token:", error.message);
        res.status(500).json({ error: "Failed to fetch Instagram access token." });
    }
}));
router.get("/confirmed", (req, res) => {
    res.send(html);
});
exports.default = router;
//# sourceMappingURL=instagramroutes.js.map