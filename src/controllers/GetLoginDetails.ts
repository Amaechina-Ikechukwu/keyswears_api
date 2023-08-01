import supabase from "../../supabase";
import dotenv from "dotenv";
import TableCreationController from "../actions/CreateTable";
import GetLongLiveUserToken from "../actions/Pages/GetLongLiveUserToken";
import SignToken from "../actions/Pages/JWTSign";
// import UserId from "../actions/Pages/GetUserId";
// import VerifyToken from "../middlewares/JWTVerify";

dotenv.config();

const createNewUserTable = new TableCreationController();
// const userid = new UserId();
const registerNewUser = async (
  data: {
    userId: string;
    token: string;
  },
  uuid: string
): Promise<any> => {
  try {
    const lltoken = await GetLongLiveUserToken(data.token); //fetching longlived token

    const { error: insertRowError } = await supabase
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
    } else {
      await createNewUserTable.createTable(data.userId);
      const uid = {
        usertoken: await SignToken({
          userid: data.userId,
          token: data.token!,
          uuid: uuid,
        }),
      };
      return uid;
    }
  } catch (error: any) {
    throw new Error(`Error registering new user: ${error.message}`);
  }
};

// const updateToken = async (data: {
//   // userId: string;
//   token: string;
//   jwtToken: string;
// }): Promise<string> => {
//   try {
//     const verifiedToken = VerifyToken(data.jwtToken);
//     const uuid = userid.GetUserId(verifiedToken.uuid);
//     const { error: updateError } = await supabase
//       .from("logindetails")
//       .update({ token: data.token })
//       .eq("uuid", uuid);

//     if (updateError) {
//       throw new Error(`Error updating token: ${updateError.message}`);
//     } else {
//       return "Done";
//     }
//   } catch (error: any) {
//     throw new Error(`Error updating token: ${error.message}`);
//   }
// };

export async function loginDetails(
  data: {
    userId: string;
    token: string;
    jwtToken: string;
  },
  uuid: string
): Promise<string[] | string> {
  try {
    const { data: userData, error } = await supabase
      .from("logindetails")
      .select("*")
      .eq("userid", data.userId);

    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    } else {
      if (userData.length === 0) {
        const result = await registerNewUser(data, uuid);
        return result;
      } else {
        // const result = await updateToken(data);
        return "null";
      }
    }
  } catch (error: any) {
    throw new Error(`Error in loginDetails function: ${error.message}`);
  }
}
