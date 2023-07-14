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
exports.loginDetails = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Provide a custom schema. Defaults to "public".
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const registerNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { error: insertRowError } = yield supabase
        .from('logindetails')
        .insert([
        {
            userid: data.userId,
            token: data.token,
        },
    ]);
    if (insertRowError) {
        throw new Error(`There seems to be an error: ${insertRowError.message}`);
    }
    else {
        return "Done";
    }
});
const updateToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { error: updateError } = yield supabase
        .from('logindetails')
        .update({ token: data.token })
        .eq('userid', data.userId);
    if (updateError) {
        throw new Error(`Error updating token: ${updateError.message}`);
    }
    else {
        return "Done";
    }
});
function loginDetails(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: userData, error } = yield supabase
            .from('logindetails')
            .select('*')
            .eq('userid', data.userId);
        if (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
        else {
            if (userData.length === 0) {
                yield registerNewUser(data);
            }
            else {
                yield updateToken(data);
            }
        }
    });
}
exports.loginDetails = loginDetails;
//# sourceMappingURL=GetLoginDetails.js.map