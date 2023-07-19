import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import TableCreationController from "../actions/CreateTable";
dotenv.config();

// Provide a custom schema. Defaults to "public".
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_KEY || "";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
const createNewUserTable = new TableCreationController();

const registerNewUser = async (data: {
  userId: string;
  token: string;
}): Promise<string> => {
  try {
    await createNewUserTable.createTable(data.userId);

    const { error: insertRowError } = await supabase
      .from("logindetails")
      .insert([
        {
          userid: data.userId,
          token: data.token,
        },
      ]);

    if (insertRowError) {
      throw new Error(`There seems to be an error: ${insertRowError.message}`);
    } else {
      return "done";
    }
  } catch (error: any) {
    throw new Error(`Error registering new user: ${error.message}`);
  }
};

const updateToken = async (data: {
  userId: string;
  token: string;
}): Promise<string> => {
  try {
    const { error: updateError } = await supabase
      .from("logindetails")
      .update({ token: data.token })
      .eq("userid", data.userId);

    if (updateError) {
      throw new Error(`Error updating token: ${updateError.message}`);
    } else {
      return "Done";
    }
  } catch (error: any) {
    throw new Error(`Error updating token: ${error.message}`);
  }
};

export async function loginDetails(data: {
  userId: string;
  token: string;
}): Promise<void> {
  try {
    const { data: userData, error } = await supabase
      .from("logindetails")
      .select("*")
      .eq("userid", data.userId);

    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    } else {
      if (userData.length === 0) {
        await registerNewUser(data);
      } else {
        await updateToken(data);
      }
    }
  } catch (error: any) {
    throw new Error(`Error in loginDetails function: ${error.message}`);
  }
}
