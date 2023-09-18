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
exports.UserProfileInformation = void 0;
const axios_1 = __importDefault(require("axios"));
const supabase_1 = __importDefault(require("../../../supabase"));
class UserProfileInformation {
    constructor(apiVersion) {
        this.baseUrl = `https://graph.facebook.com/${apiVersion}`;
    }
    getPersonData(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: logindetails, error } = yield supabase_1.default
                .from("logindetails")
                .select("userid,token")
                .eq("uuid", uuid);
            if (error) {
                throw new Error(error.message);
            }
            const url = `${this.baseUrl}/${logindetails[0].userid}?fields=id,name,email,picture&access_token=${logindetails[0].token}`;
            try {
                const response = yield axios_1.default.get(url);
                return response.data;
            }
            catch (error) {
                console.error("Error:", error);
                throw error;
            }
        });
    }
}
exports.UserProfileInformation = UserProfileInformation;
//# sourceMappingURL=UserProfileInformation.js.map