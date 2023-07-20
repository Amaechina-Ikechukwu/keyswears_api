import supabase from "../../supabase";
import dotenv from "dotenv";
import TableCreationController from "../actions/CreateTable";
dotenv.config();

const createNewUserTable = new TableCreationController();

const registerNewUser = async (
  data: {
    userId: string;
    token: string;
  },
  uuid: string
): Promise<any> => {
  try {
    await createNewUserTable.createTable(data.userId);

    const { error: insertRowError } = await supabase
      .from("logindetails")
      .insert([
        {
          userid: data.userId,
          token: data.token,
          uuid: uuid,
        },
      ]);

    if (insertRowError) {
      throw new Error(`There seems to be an error: ${insertRowError.message}`);
    } else {
      const uid = { uuid: uuid };
      return uid;
    }
  } catch (error: any) {
    throw new Error(`Error registering new user: ${error.message}`);
  }
};

const updateToken = async (data: {
  userId: string;
  token: string;
  uuid: string;
}): Promise<string> => {
  try {
    const { error: updateError } = await supabase
      .from("logindetails")
      .update({ token: data.token })
      .eq("uuid", data.uuid);

    if (updateError) {
      throw new Error(`Error updating token: ${updateError.message}`);
    } else {
      return "Done";
    }
  } catch (error: any) {
    throw new Error(`Error updating token: ${error.message}`);
  }
};

export async function loginDetails(
  data: {
    userId: string;
    token: string;
    uuid: string;
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
        const result = await updateToken(data);
        return result;
      }
    }
  } catch (error: any) {
    throw new Error(`Error in loginDetails function: ${error.message}`);
  }
}
