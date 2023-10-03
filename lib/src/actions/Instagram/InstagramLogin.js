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
exports.InstagramLogin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_1 = __importDefault(require("../../../supabase"));
// import TableCreationController from "../actions/CreateTable";
const GetLongLiveUserToken_1 = __importDefault(require("./GetLongLiveUserToken"));
const JWTSign_1 = __importDefault(require("../Pages/JWTSign"));
// import UserId from "../actions/Pages/GetUserId";
// import VerifyToken from "../middlewares/JWTVerify";
dotenv_1.default.config();
// const createNewUserTable = new TableCreationController();
// const userid = new UserId();
const updateToken = (userdata) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.default
        .from("instagram_logins")
        .update({ token: userdata.access_token })
        .eq("userid", userdata.user_id)
        .select();
    if (error) {
        throw new Error(`There seems to be an error: ${error.message}`);
    }
    else {
        const updatedData = data[0];
        return updatedData;
    }
});
const registerNewUser = (data, uuid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lltoken = yield (0, GetLongLiveUserToken_1.default)(data.access_token); //fetching longlived token
        const { error: insertRowError } = yield supabase_1.default
            .from("instagram_logins")
            .insert([
            {
                userid: data.user_id,
                token: lltoken,
                uuid: uuid,
            },
        ]);
        if (insertRowError) {
            throw new Error(`There seems to be an error: ${insertRowError.message}`);
        }
        else {
            const uid = yield (0, JWTSign_1.default)({
                userid: data.user_id,
                token: data.access_token,
                uuid: uuid,
            });
            return uid;
        }
    }
    catch (error) {
        throw new Error(`Error registering new user: ${error.message}`);
    }
});
function InstagramLogin(Data, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data: userData, error } = yield supabase_1.default
                .from("instagram_logins")
                .select("*")
                .eq("userid", Data.user_id);
            if (error) {
                throw new Error(`Error fetching user: ${error.message}`);
            }
            else {
                if (userData.length === 0) {
                    const result = yield registerNewUser(Data, uuid);
                    return result;
                }
                else {
                    const result = yield updateToken(Data);
                    const uid = yield (0, JWTSign_1.default)(result);
                    return uid;
                }
            }
        }
        catch (error) {
            throw new Error(`Error in loginDetails function: ${error.message}`);
        }
    });
}
exports.InstagramLogin = InstagramLogin;
//# sourceMappingURL=InstagramLogin.js.map