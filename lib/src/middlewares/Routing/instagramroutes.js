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
const uuid_1 = require("uuid");
const InstagramLogin_1 = require("../../actions/Instagram/InstagramLogin");
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
const REDIRECT_URI = "https://ebc5-129-205-113-159.ngrok-free.app/instagram/confirm";
router.get("/confirm", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query; // Explicitly cast `code` to string
    try {
        const redirectUri = REDIRECT_URI;
        const clientId = process.env.IG_CLIENT;
        const clientSecret = process.env.IG_SECRET;
        // Create a FormData object to send as the request body
        const formData = new FormData();
        formData.append("client_id", clientId);
        formData.append("client_secret", clientSecret);
        formData.append("grant_type", "authorization_code");
        formData.append("redirect_uri", redirectUri);
        formData.append("code", code);
        // Set the headers manually
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded", // Set the correct content type
        };
        // Make a POST request to Instagram's OAuth access token endpoint
        const response = yield axios_1.default.post("https://api.instagram.com/oauth/access_token", formData, {
            headers: headers, // Set headers
        });
        const result = response.data;
        const newUUID = (0, uuid_1.v4)();
        const uid = yield (0, InstagramLogin_1.InstagramLogin)(result, newUUID);
        console.log(uid);
        res.json({ uid }); // Return the access token in the response
    }
    catch (error) {
        console.error("Error while fetching Instagram access token:", error);
        res.status(500).json({ error: "Failed to fetch Instagram access token." });
    }
}));
router.post("/adduser", (req, res) => {
    const { access_token, user_id, pageid } = req.body;
    console.log(access_token, user_id, pageid);
    res.status(200).json({ message: "done" });
});
router.get("/confirmed", (req, res) => {
    res.send(html);
});
exports.default = router;
//# sourceMappingURL=instagramroutes.js.map