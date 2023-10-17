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
const supabase_1 = __importDefault(require("../../../supabase"));
// async function GetPageInfo(uuid: string): Promise<any> {
//   try {
//     const { data } = await supabase
//       .from(`instagram_pages`)
//       .select("pageid,access_token")
//       .eq("uuid", uuid)
//       .single();
//     return data; // Return true if data is not empty, otherwise false
//   } catch (error) {
//     return false; // Return false if there's an error
//   }
//   // Explicitly return false if the try block did not return anything (TypeScript error fix)
// }
function UpdateInstagramId(uuid, id, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase_1.default
                .from("logindetails")
                .update({ instagramid: id, ig_token: token })
                .eq("uuid", uuid);
            if (error) {
                throw new Error(`Error inserting value: ${error.message}`);
            }
            return data; // Return true if data is not empty, otherwise false
        }
        catch (error) {
            return false; // Return false if there's an error
        }
        // Explicitly return false if the try block did not return anything (TypeScript error fix)
    });
}
function GetInstagramBusinessAccountId(page, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const appId = process.env.CLIENT_ID;
            // const appSecret = process.env.CLIENT_SECRET;
            // const { pageid, access_token } = await GetPageInfo(uuid);
            const { id, access_token } = page;
            const url = `https://graph.facebook.com/v18.0/${id}?fields=instagram_business_account&access_token=${access_token}`;
            const response = yield axios_1.default.get(url);
            const result = response.data.instagram_business_account.id;
            yield UpdateInstagramId(uuid, result, access_token);
            return;
        }
        catch (error) {
            throw new Error("Failed to fetch IG business account id token.");
        }
    });
}
exports.default = GetInstagramBusinessAccountId;
//# sourceMappingURL=GetInstagramBusinessAccountId.js.map