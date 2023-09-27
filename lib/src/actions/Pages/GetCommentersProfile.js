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
// facebookApi.ts
const axios_1 = __importDefault(require("axios"));
const supabase_1 = __importDefault(require("../../../supabase"));
function GetCommentersProfile(psid, pagename) {
    return __awaiter(this, void 0, void 0, function* () {
        let { data: pages, error } = yield supabase_1.default
            .from("pages")
            .select("access_token")
            .eq("name", pagename);
        if (error) {
            throw new Error(error.message);
        }
        const url = `https://graph.facebook.com/${psid}?fields=name,profile_pic&access_token=${pages[0].access_token}`;
        try {
            const response = yield axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.default = GetCommentersProfile;
//# sourceMappingURL=GetCommentersProfile.js.map