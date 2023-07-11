import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

// Provide a custom schema. Defaults to "public".
const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);
export async function loginDetails(data: {
  userId: string;
  token: string;
}): Promise<string> {
  const { error: insertRowError } = await supabase.from('logindetails').insert([
    {
      userid: data.userId,
      token: data.token,
    },
  ]).select();

  if (insertRowError) {
    throw new Error(`There seems to be an error: ${insertRowError.message}`);
  } else {
    return "Done";
  }
}
