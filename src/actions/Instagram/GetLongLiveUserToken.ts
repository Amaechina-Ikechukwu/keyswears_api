import axios from "axios";
import "dotenv/config";

export default async function GetLongLiveUserToken(
  token: string
): Promise<string> {
  try {
    // const appId = process.env.CLIENT_ID;
    // const appSecret = process.env.CLIENT_SECRET;
    const yourAccessToken = token;
    const url = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.IG_SECRET}&access_token=${yourAccessToken}`;

    const response = await axios.get(url);
    const result = response.data.access_token;

    return result;
  } catch (error: any) {
    console.error(
      "Error while fetching IG long-lived user token:",
      error.message
    );
    throw new Error("Failed to fetch IG long-lived user token.");
  }
}
