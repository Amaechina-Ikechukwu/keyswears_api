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
class SubscribePages {
    PagesToSubscribe(pages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageid = pages.id;
                const formData = new URLSearchParams();
                formData.append("subscribed_fields", "feed");
                formData.append("access_token", pages.access_token);
                const response = yield axios_1.default.post(`https://graph.facebook.com/${pageid}/subscribed_apps`, formData.toString(), // Use formData.toString() to send the data as a URL-encoded string
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                const result = response.data;
                return result;
            }
            catch (error) {
                throw new Error("Error fetching data: " + error);
            }
        });
    }
}
exports.default = SubscribePages;
//# sourceMappingURL=SubscribePage.js.map