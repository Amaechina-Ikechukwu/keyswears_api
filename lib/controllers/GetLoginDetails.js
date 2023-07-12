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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDetails = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
require("dotenv/config");
// Provide a custom schema. Defaults to "public".
const supabase = (0, supabase_js_1.createClient)((_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : "", (_b = process.env.SUPABASE_KEY) !== null && _b !== void 0 ? _b : "");
function loginDetails(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error: insertRowError } = yield supabase.from('logindetails').insert([
            {
                userid: data.userId,
                token: data.token,
            },
        ]).select();
        if (insertRowError) {
            throw new Error(`There seems to be an error: ${insertRowError.message}`);
        }
        else {
            return "Done";
        }
    });
}
exports.loginDetails = loginDetails;
//# sourceMappingURL=GetLoginDetails.js.map