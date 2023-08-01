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
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
function GetLongLiveUserToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const appId = process.env.CLIENT_ID;
            // const appSecret = process.env.CLIENT_SECRET;
            const yourAccessToken = token;
            const url = `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=533621215529346&client_secret=64e632f4c65f4b0ad17da4ea55a090bb&fb_exchange_token=${yourAccessToken}`;
            const response = yield axios_1.default.get(url);
            const result = response.data.access_token;
            console.log(result);
            return result;
        }
        catch (error) {
            console.error("Error while fetching long-lived user token:", error.message);
            throw new Error("Failed to fetch long-lived user token.");
        }
    });
}
exports.default = GetLongLiveUserToken;
//# sourceMappingURL=GetLongLiveUserToken.js.map