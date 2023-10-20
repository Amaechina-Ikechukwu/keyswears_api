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
const GetUserInformation_1 = __importDefault(require("../../actions/Instagram/GetUserInformation"));
const ValidatedUUIDHeader_1 = __importDefault(require("../ValidatedUUIDHeader"));
const QueryUserDetails_1 = __importDefault(require("../../actions/Instagram/QueryUserDetails"));
const PagesThatAreConnected_1 = __importDefault(require("../../actions/Instagram/PagesThatAreConnected"));
const AddConnectedPagesToSupabase_1 = __importDefault(require("../../actions/Instagram/AddConnectedPagesToSupabase"));
const GetInstagramBusinessAccountId_1 = __importDefault(require("../../actions/Instagram/GetInstagramBusinessAccountId"));
const GetMediaInsights_1 = __importDefault(require("../../actions/Instagram/GetMediaInsights"));
const GetAccountInsight_1 = __importDefault(require("../../actions/Instagram/GetAccountInsight"));
const GetUserSmallMedia_1 = __importDefault(require("../../actions/Instagram/GetUserSmallMedia"));
const GetUserFullMedia_1 = __importDefault(require("../../actions/Instagram/GetUserFullMedia"));
const GetMediaComments_1 = __importDefault(require("../../actions/Instagram/GetMediaComments"));
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
router.get("/isuserregistered", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instagramid } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = instagramid;
        res.json({ data });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/user", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.query.token as string;
    // or const { token } = req.query as { token: string };
    try {
        const { instagramid, token } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, GetUserInformation_1.default)(instagramid, token);
        res.json({ data });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/pages", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, PagesThatAreConnected_1.default)(token);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/confirmpages", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uuid } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const { pages } = req.body;
        if (pages.length > 1) {
            res.status(403).json({ message: "Please only select a page" });
        }
        else {
            yield pages.map((page) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, AddConnectedPagesToSupabase_1.default)(page, uuid);
            }));
            res.status(200).json({ message: "done" });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.post("/registeruser", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.body;
        //const { uuid } = await QueryUserDetails(req.uuid);
        yield (0, GetInstagramBusinessAccountId_1.default)(page, req.uuid);
        res.status(200).json({ message: "done" });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/mediasmalldata", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ig_token, instagramid } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, GetUserSmallMedia_1.default)(instagramid, ig_token);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/mediafulldata", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, media_id } = req.query;
        const { ig_token } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, GetUserFullMedia_1.default)(type, media_id, ig_token);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/mediacomments", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { media_id } = req.query;
        const { ig_token } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, GetMediaComments_1.default)(media_id, ig_token);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/mediainsight", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { media_id } = req.query;
        const { ig_token } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, GetMediaInsights_1.default)(media_id, ig_token);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
router.get("/accountinsight", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ig_token, instagramid } = yield (0, QueryUserDetails_1.default)(req.uuid);
        const data = yield (0, GetAccountInsight_1.default)(instagramid, ig_token);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=instagramroutes.js.map