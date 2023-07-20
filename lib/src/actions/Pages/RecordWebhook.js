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
    PageChanges(userid, pagedata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error: insertRowError, data } = yield supabase_1.default
                .from(`userid_${userid}`)
                .insert(pagedata)
                .select();
            if (insertRowError) {
                throw new Error(`Error adding data ${insertRowError}`);
            }
            else {
                return data;
            }
        });
    }
}
exports.default = RecordPageWebhooks;
//# sourceMappingURL=RecordWebhook.js.map