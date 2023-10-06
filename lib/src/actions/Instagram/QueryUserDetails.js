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
/**
 * GetUserId
 */
function QueryUserDetails(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase_1.default
                .from("logindetails")
                .select("*")
                .eq("uuid", uuid)
                .single();
            if (error) {
                // Log the error for debugging purposes
                console.error("Supabase query error:", error);
                throw new Error(`Error getting data: ${error.message}`);
            }
            // Return the userid if data is available
            return data;
        }
        catch (error) {
            // Handle any other potential errors
            console.error("Error retrieving user ID:", error);
            throw new Error("An error occurred while fetching the user ID.");
        }
    });
}
exports.default = QueryUserDetails;
//# sourceMappingURL=QueryUserDetails.js.map