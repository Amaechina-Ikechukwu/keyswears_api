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
class RecordPageWebhooks {
    PageChanges(userid, pdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagedata = pdata.value;
            const datafrompage = {
                from_id: pagedata.from.id || null,
                from_name: pagedata.from.name || null,
                post: [pagedata.post] || null,
                post_id: pagedata.post_id || null,
                comment_id: pagedata.comment_id || null,
                created_time: pagedata.item || null,
                parent_id: pagedata.parent_id || null,
                verb: pagedata.verb || null,
                field: pdata.field || null,
                reaction_type: pagedata.reaction_type || null,
            };
            try {
                const { error: insertRowError, data } = yield supabase_1.default
                    .from(`userid_${userid}`)
                    .insert(datafrompage)
                    .select();
                if (insertRowError) {
                    console.log(insertRowError.message);
                    throw new Error(`Error adding data ${insertRowError.message}`);
                }
                else {
                    console.log(data);
                    return data;
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("error" + error);
            }
        });
    }
}
exports.default = RecordPageWebhooks;
//# sourceMappingURL=RecordWebhook.js.map