import axios from "axios";
import "dotenv/config";
import supabase from "../../../supabase";
// async function GetPageInfo(uuid: string): Promise<any> {
//   try {
//     const { data } = await supabase
//       .from(`instagram_pages`)
//       .select("pageid,access_token")
//       .eq("uuid", uuid)
//       .single();

//     return data; // Return true if data is not empty, otherwise false
//   } catch (error) {
//     return false; // Return false if there's an error
//   }

//   // Explicitly return false if the try block did not return anything (TypeScript error fix)
// }
async function UpdateInstagramId(
  uuid: string,
  id: string,
  token: string
): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("logindetails")
      .update({ instagramid: id, ig_token: token })
      .eq("uuid", uuid);
    if (error) {
      throw new Error(`Error inserting value: ${error.message}`);
    }

    return data; // Return true if data is not empty, otherwise false
  } catch (error) {
    return false; // Return false if there's an error
  }

  // Explicitly return false if the try block did not return anything (TypeScript error fix)
}
export default async function GetInstagramBusinessAccountId(
  page:any,uuid: string
): Promise<void> {
  try {
    // const appId = process.env.CLIENT_ID;
    // const appSecret = process.env.CLIENT_SECRET;
    // const { pageid, access_token } = await GetPageInfo(uuid);
    const { id, access_token } =  page;

    const url = `https://graph.facebook.com/v18.0/${id}?fields=instagram_business_account&access_token=${access_token}`;

    const response = await axios.get(url);
    const result = response.data.instagram_business_account.id;

    await UpdateInstagramId(uuid, result, access_token);
    return;
  } catch (error: any) {
    
    throw new Error("Failed to fetch IG business account id token.");
  }
}
