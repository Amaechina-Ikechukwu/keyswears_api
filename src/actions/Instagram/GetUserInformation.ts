import axios from "axios";
import "dotenv/config";

export default async function GetUserInformation(
  instagramid: string,
  token: string
): Promise<string> {
  try {
    // const appId = process.env.CLIENT_ID;
    // const appSecret = process.env.CLIENT_SECRET;
    const yourAccessToken = token;
    const url = `https://graph.facebook.com/v18.0/${instagramid}?fields=name,profile_picture_url,biography,media_count,followers_count,follows_count&access_token=${yourAccessToken}`;

    const response = await axios.get(url);
    const result = response.data;

    return result;
  } catch (error: any) {
    console.error(
      "Error while fetching IG long-lived user token:",
      error.message
    );
    throw new Error("Failed to fetch IG long-lived user token.");
  }
}
