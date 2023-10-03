import dotenv from "dotenv";
import supabase from "../../../supabase";
// import TableCreationController from "../actions/CreateTable";
import GetLongLiveUserToken from "./GetLongLiveUserToken";
import SignToken from "../Pages/JWTSign";
// import UserId from "../actions/Pages/GetUserId";
// import VerifyToken from "../middlewares/JWTVerify";

dotenv.config();

// const createNewUserTable = new TableCreationController();
// const userid = new UserId();
const updateToken = async (userdata: any) => {
  const { data, error } = await supabase
    .from("instagram_logins")
    .update({ token: userdata.access_token })
    .eq("userid", userdata.user_id)
    .select();
  if (error) {
    throw new Error(`There seems to be an error: ${error.message}`);
  } else {
    const updatedData = data[0];
    return updatedData;
  }
};
const registerNewUser = async (
  data: {
    user_id: string;
    access_token: string;
  },
  uuid: string
): Promise<any> => {
  try {
    const lltoken = await GetLongLiveUserToken(data.access_token); //fetching longlived token

    const { error: insertRowError } = await supabase
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
    } else {
      const uid = await SignToken({
        userid: data.user_id,
        token: data.access_token,
        uuid: uuid,
      });
      return uid;
    }
  } catch (error: any) {
    throw new Error(`Error registering new user: ${error.message}`);
  }
};

export async function InstagramLogin(
  Data: {
    user_id: string;
    access_token: string;
    jwtToken: string;
  },
  uuid: string
): Promise<string[] | string> {
  try {
    const { data: userData, error } = await supabase
      .from("instagram_logins")
      .select("*")
      .eq("userid", Data.user_id);

    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    } else {
      if (userData.length === 0) {
        const result = await registerNewUser(Data, uuid);
        return result;
      } else {
        const result = await updateToken(Data);

        const uid: any = await SignToken(result);

        return uid;
      }
    }
  } catch (error: any) {
    throw new Error(`Error in loginDetails function: ${error.message}`);
  }
}
