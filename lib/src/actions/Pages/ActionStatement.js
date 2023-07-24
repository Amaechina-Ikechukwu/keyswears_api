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
class ActionStatement {
    Main() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    CommentRemoved() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = "We noticed [someone] deleted his comment";
            return response;
        });
    }
    CommentAdded() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = `Theres a new comment from [someone], what would you like to do`;
            return response;
        });
    }
    Liked() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = `[somone] liked your account. Seems you are making waves`;
            return response;
        });
    }
}
//# sourceMappingURL=ActionStatement.js.map