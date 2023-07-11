"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDetails = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
require("dotenv/config");
// Provide a custom schema. Defaults to "public".
const supabase = (0, supabase_js_1.createClient)((_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : "", (_b = process.env.SUPABASE_KEY) !== null && _b !== void 0 ? _b : "");
async function loginDetails(data) {
    const { error: insertRowError } = await supabase.from('logindetails').insert([
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
}
exports.loginDetails = loginDetails;
//# sourceMappingURL=GetLoginDetails.js.map