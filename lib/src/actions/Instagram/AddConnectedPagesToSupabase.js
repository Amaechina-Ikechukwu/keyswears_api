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
const supabase_1 = __importDefault(require("../../../supabase"));
require("dotenv/config");
const uuid_1 = require("uuid"); // Import uuid4 generator
// Define the table and column name
// Insert the value into the array column
const AddConnectedPagesToSupabase = (page, uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const userpages = page;
    if (!(0, uuid_1.validate)(uuid)) {
        throw new Error("Invalid unique identifier (uuid)");
    }
    const pagedata = {
        access_token: userpages === null || userpages === void 0 ? void 0 : userpages.access_token,
        name: userpages === null || userpages === void 0 ? void 0 : userpages.name,
        pageid: userpages === null || userpages === void 0 ? void 0 : userpages.id,
        uuid: uuid,
        category: userpages === null || userpages === void 0 ? void 0 : userpages.category,
        task: userpages === null || userpages === void 0 ? void 0 : userpages.tasks,
        category_list_id: userpages === null || userpages === void 0 ? void 0 : userpages.category_list.id,
        category_list_name: userpages === null || userpages === void 0 ? void 0 : userpages.category_list.name,
    };
    try {
        if ((yield DoesPageExist(userpages === null || userpages === void 0 ? void 0 : userpages.id)) === false) {
            const { data, error } = yield supabase_1.default
                .from("instagram_pages")
                .insert(pagedata);
            if (error) {
                throw new Error(`Error inserting value: ${error.message}`);
            }
            return "Value inserted successfully: " + data;
        }
        else {
            const { data, error } = yield supabase_1.default
                .from("instagram_pages")
                .update(pagedata)
                .eq("pageid", userpages === null || userpages === void 0 ? void 0 : userpages.id);
            if (error) {
                throw new Error(`Error inserting value: ${error.message}`);
            }
            return "Value inserted successfully: " + data;
        }
    }
    catch (error) {
        return "Error inserting value:" + error.message;
    }
});
function DoesPageExist(pageid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield supabase_1.default
                .from(`instagram_pages`)
                .select("*")
                .eq("pageid", pageid);
            return !(!data || data.length === 0); // Return true if data is not empty, otherwise false
        }
        catch (error) {
            return false; // Return false if there's an error
        }
        // Explicitly return false if the try block did not return anything (TypeScript error fix)
    });
}
// Call the function to insert the value
exports.default = AddConnectedPagesToSupabase;
//# sourceMappingURL=AddConnectedPagesToSupabase.js.map