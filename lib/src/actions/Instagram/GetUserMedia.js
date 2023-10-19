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
function GetUserMedia(media_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://graph.facebook.com/${media_id}/insights?metric=impressions,reach,carousel_album_impressions,carousel_album_reach,carousel_album_engagement,carousel_album_saved,carousel_album_video_views,taps_forward,taps_back,exits,replies,engagement,saved,video_views&period=day&access_token=${token}`;
            const response = yield axios_1.default.get(url);
            const result = response.data;
            return result;
        }
        catch (error) {
            console.error("Error while fetching Media Insight:", error.message);
            throw new Error("Failed to fetch Error while fetching Media Insight.");
        }
    });
}
exports.default = GetUserMedia;
//# sourceMappingURL=GetUserMedia.js.map