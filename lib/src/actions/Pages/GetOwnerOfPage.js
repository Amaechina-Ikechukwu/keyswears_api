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
class GetOwnerOfThePage {
    PageOwner(pageid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield supabase_1.default
                .from("pages")
                .select()
                .eq("pageid", pageid);
            if (error) {
                console.error("Supabase query error:", error);
                throw new Error(`Error finding user pages: ${error.message}`);
            }
            else {
                const uid = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.uuid;
                return uid;
            }
        });
    }
}
exports.default = GetOwnerOfThePage;
//# sourceMappingURL=GetOwnerOfPage.js.map