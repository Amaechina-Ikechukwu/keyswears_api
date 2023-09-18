// facebookApi.ts
import axios from "axios";
import supabase from "../../../supabase";

export default async function GetCommentersProfile(
  psid: string,
  pagename: string
) {
  let { data: pages, error } = await supabase
    .from("pages")
    .select("access_token")
    .eq("name", pagename);
  if (error) {
    throw new Error(error.message);
  }
  const url = `https://graph.facebook.com/${psid}?fields=name,profile_pic&access_token=${pages[0].access_token}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
