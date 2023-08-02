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
const GetPageAccessToken_1 = __importDefault(require("../../actions/Pages/GetPageAccessToken"));
class ReplyComment {
    /**
     * async Reply
     */
    Reply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageAccessToken = yield new GetPageAccessToken_1.default().PageAccessToken(data.pageid);
                const response = yield axios_1.default.post(`https://www.graph.facebook.com/${data.commentid}/comments`, {
                    message: `${data.message}, @[{user-id}]`,
                    access_token: pageAccessToken,
                });
                const result = response.data;
                return result;
            }
            catch (error) {
                console.error("Error occurred:", error);
                throw new Error(`Error posting comment: ${error}`);
            }
        });
    }
}
exports.default = ReplyComment;
//# sourceMappingURL=ReplyComment.js.map