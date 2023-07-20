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
    PagesToSubscribe(pageId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    subscribed_fields: "feed",
                    access_token: token,
                };
                const response = yield axios_1.default.get(`https://graph.facebook.com/${pageId}/subscribed_apps`, {
                    params,
                });
                // Assuming the response data is an object with an 'accounts' property that contains an array of page objects,
                // extract the 'name' property from each page object and return as an array of strings.
                const pages = response.data;
                return pages;
            }
            catch (error) {
                throw new Error("Error fetching data: " + error);
            }
        });
    }
}
exports.default = SubscribePages;
//# sourceMappingURL=SubscribePage.js.map