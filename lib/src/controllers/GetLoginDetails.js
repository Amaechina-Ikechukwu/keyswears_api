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
const supabase_1 = __importDefault(require("../../supabase"));
const dotenv_1 = __importDefault(require("dotenv"));
// import TableCreationController from "../actions/CreateTable";
const GetLongLiveUserToken_1 = __importDefault(require("../actions/Pages/GetLongLiveUserToken"));
const JWTSign_1 = __importDefault(require("../actions/Pages/JWTSign"));
// import UserId from "../actions/Pages/GetUserId";
// import VerifyToken from "../middlewares/JWTVerify";
dotenv_1.default.config();
// const createNewUserTable = new TableCreationController();
// const userid = new UserId();
const registerNewUser = (data, uuid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lltoken = yield (0, GetLongLiveUserToken_1.default)(data.token); //fetching longlived token
        const { error: insertRowError } = yield supabase_1.default
            .from("logindetails")
            .insert([
            {
                userid: data.userId,
                token: lltoken,
                uuid: uuid,
            },
        ]);
        if (insertRowError) {
            throw new Error(`There seems to be an error: ${insertRowError.message}`);
        }
        else {
            const uid = yield (0, JWTSign_1.default)({
                userid: data.userId,
                token: data.token,
                uuid: uuid,
            });
            return uid;
        }
    }
    catch (error) {
        throw new Error(`Error registering new user: ${error.message}`);
    }
});
function loginDetails(data, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data: userData, error } = yield supabase_1.default
                .from("logindetails")
                .select("*")
                .eq("userid", data.userId);
            if (error) {
                throw new Error(`Error fetching user: ${error.message}`);
            }
            else {
                if (userData.length === 0) {
                    const result = yield registerNewUser(data, uuid);
                    return result;
                }
                else {
                    const uid = yield (0, JWTSign_1.default)(userData[0]);
                    return uid;
                }
            }
        }
        catch (error) {
            throw new Error(`Error in loginDetails function: ${error.message}`);
        }
    });
}
exports.loginDetails = loginDetails;
//# sourceMappingURL=GetLoginDetails.js.map