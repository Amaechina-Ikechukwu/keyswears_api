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
const supabase_1 = __importDefault(require("../../../supabase")); // Replace "../../../supabase" with the correct relative path to the supabase module
const hash = require("object-hash");
class RecordPageWebhooks {
    PageChanges(userid, pdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagedata = pdata.value;
            const pagehash = hash(pagedata);
            const checkhash = yield this.DoesPageHashExist(userid, pagehash);
            const datafrompage = {
                from_id: pagedata.from.id || null,
                from_name: pagedata.from.name || null,
                post: [pagedata.post] || null,
                pageid: pagedata.post_id || null,
                comment_id: pagedata.comment_id || null,
                createdtime: pagedata.created_time || null,
                item: pagedata.item || null,
                parentid: pagedata.parent_id || null,
                verb: pagedata.verb || null,
                field: pdata.field || null,
                reaction_type: pagedata.reaction_type || null,
                pagehash: pagehash,
                message: pagedata.message || null,
            };
            console.log({ datafrompage });
            try {
                if (!checkhash) {
                    const { error: insertRowError } = yield supabase_1.default
                        .from(`userid_${userid}`)
                        .insert(datafrompage);
                    if (insertRowError) {
                        console.log(insertRowError.message);
                        throw new Error(`Error adding data ${insertRowError.message}`);
                    }
                    else {
                        const data = "done";
                        return data;
                    }
                }
                else {
                    console.log("same page data");
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("error" + error);
            }
            return "done";
        });
    }
    DoesPageHashExist(userid, pagehash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield supabase_1.default
                    .from(`userid_${userid}`)
                    .select("*")
                    .eq("pagehash", pagehash);
                return !(!data || data.length === 0); // Return true if data is not empty, otherwise false
            }
            catch (error) {
                return false; // Return false if there's an error
            }
            // Explicitly return false if the try block did not return anything (TypeScript error fix)
        });
    }
}
exports.default = RecordPageWebhooks;
//# sourceMappingURL=RecordWebhook.js.map