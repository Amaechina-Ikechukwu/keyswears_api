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
function GetAccountInsight(user_id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://graph.facebook.com/${user_id}/insights?metric=impressions,reach,profile_views
    &period=day&access_token=${token}`;
            const response = yield axios_1.default.get(url);
            const result = response.data;
            return result;
        }
        catch (error) {
            console.error("Error while fetching Account Insight:", error.message);
            throw new Error("Failed to fetch Error while fetching Account Insight.");
        }
    });
}
exports.default = GetAccountInsight;
//# sourceMappingURL=GetAccountInsight.js.map