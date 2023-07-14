import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

// Provide a custom schema. Defaults to "public".
const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseKey: string = process.env.SUPABASE_KEY || "";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const registerNewUser = async (data: { userId: string; token: string }): Promise<string> => {
  const { error: insertRowError } = await supabase
    .from('logindetails')
    .insert([
      {
        userid: data.userId,
        token: data.token,
      },
    ]);

  if (insertRowError) {
    throw new Error(`There seems to be an error: ${insertRowError.message}`);
  } else {
    return "Done";
  }
};

const updateToken = async (data: { userId: string; token: string }): Promise<string> => {
  const { error: updateError } = await supabase
    .from('logindetails')
    .update({ token: data.token })
    .eq('userid', data.userId);

  if (updateError) {
    throw new Error(`Error updating token: ${updateError.message}`);
  } else {
    return "Done";
  }
};

export async function loginDetails(data: { userId: string; token: string }): Promise<void> {
  const { data: userData, error } = await supabase
    .from('logindetails')
    .select('*')
    .eq('userid', data.userId);

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  } else {
    if (userData.length === 0) {
      await registerNewUser(data);
    } else {
      await updateToken(data);
    }
  }
}
