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
function GetUserMediaObjects(userid, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://graph.facebook.com/v18.0/${userid}/media?access_token=${token}`;
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error("Error while fetching Media Object:", error.message);
            throw new Error("Failed to fetch Media Object.");
        }
    });
}
function GetUserSmallMediaData(media_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://graph.facebook.com/v18.0/${media_id}?fields=id,media_type,media_url,owner,timestamp&access_token=${token}`;
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error("Error while fetching Media Small Data:", error.message);
            throw new Error("Failed to fetch Media Small Data.");
        }
    });
}
function GetUserSmallMedia(user_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield GetUserMediaObjects(user_id, token);
            const userData = [];
            for (const item of data.data) {
                const result = yield GetUserSmallMediaData(item.id, token);
                userData.push(result);
            }
            return userData;
        }
        catch (error) {
            console.error("Error while fetching Media Data:", error.message);
            throw new Error("Failed to fetch Media Data.");
        }
    });
}
exports.default = GetUserSmallMedia;
//# sourceMappingURL=GetUserSmallMedia.js.map