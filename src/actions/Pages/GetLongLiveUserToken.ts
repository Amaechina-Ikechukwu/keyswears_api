import axios from "axios";
import "dotenv/config";

export default async function GetLongLiveUserToken(
  token: string
): Promise<string> {
  try {
    // const appId = process.env.CLIENT_ID;
    // const appSecret = process.env.CLIENT_SECRET;
    const yourAccessToken = token;
    const url = `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=533621215529346&client_secret=64e632f4c65f4b0ad17da4ea55a090bb&fb_exchange_token=${yourAccessToken}`;

    const response = await axios.get(url);
    const result = response.data.access_token;

    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error while fetching long-lived user token:", error.message);
    throw new Error("Failed to fetch long-lived user token.");
  }
}
