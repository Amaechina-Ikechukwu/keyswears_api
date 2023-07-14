import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

// Provide a custom schema. Defaults to "public".
const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);
const registerNewUser =async (data)=>{
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

const updateToken =async()=> {
  const {data:updatedData,error:updateError}= await supabase
  .from('logindetails').update({token :data.token}).eq('userid',data.userId);
  if(updateError){
    throw new Error ( `Error updating username: ${updateError.message}` )
  }
  else

  {
    return done
  }
}
export async function loginDetails(data: {
  userId: string;
  token: string;
}): Promise<string> {
 const Data = data;
 const {data, error}= await supabase.from('logindetails').select('*').eq('userid',data.userId)
 if(error){
  throw new Error(`Error fetching user: ${error.message}`)
 }
 else
 {
  if (data.length == 0){
    registerNewUser(Data)
  }
  else{
    updateToken(Data)
  }
 }
}
