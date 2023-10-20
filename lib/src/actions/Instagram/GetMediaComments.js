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
function GetUserMediaCommentObjects(media_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://graph.facebook.com/v18.0/${media_id}/comments?access_token=${token}`;
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error("Error while fetching Media Comment Object:", error.message);
            throw new Error("Failed to fetch Media Comment Object.");
        }
    });
}
function GetCommentInformation(comment_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://graph.facebook.com/v18.0/${comment_id}?fields=from,hidden,id,like_count,media,parent_id,replies,text,timestamp,user,username&access_token=${token}`;
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error("Error while fetching CommentData Data:", error.message);
            throw new Error("Failed to fetch CommentData Data.");
        }
    });
}
// async function GetUserFullMediaData(media_id: string, token: string): Promise<any> {
//   try {
//     const url = `https://graph.facebook.com/v18.0/${media_id}?fields=id,ig_id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username,caption,comments_count&access_token=${token}`;
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error:any) {
//     console.error("Error while fetching Media Full Data:", error.message);
//     throw new Error("Failed to fetch Media Full Data.");
//   }
// }
function GetUserMediaComments(media_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield GetUserMediaCommentObjects(media_id, token);
            const commentData = [];
            for (const item of result.data) {
                const resultInformation = yield GetCommentInformation(item.id, token);
                commentData.push(resultInformation);
            }
            return commentData;
        }
        catch (error) {
            console.error("Error while fetching Media Data:", error.message);
            throw new Error("Failed to fetch Media Data.");
        }
    });
}
exports.default = GetUserMediaComments;
//# sourceMappingURL=GetMediaComments.js.map