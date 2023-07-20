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
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
require("dotenv/config");
// Initialize Supabase client
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_KEY || "");
// Define the table and column name
const tableName = "logindetails";
// Insert the value into the array column
const insertValueToArrayColumn = (page, uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const userpages = JSON.parse(page);
    try {
        const { data, error } = yield supabase
            .from(tableName)
            .update({ pages: [userpages] })
            .eq("uuid", uuid);
        if (error) {
            throw new Error(`Error inserting value: ${error.message}`);
        }
        return "Value inserted successfully: " + data;
    }
    catch (error) {
        return "Error inserting value:" + error.message;
    }
});
// Call the function to insert the value
exports.default = insertValueToArrayColumn;
//# sourceMappingURL=AnotherUserPages.js.map