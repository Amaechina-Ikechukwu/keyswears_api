import axios from "axios";
import "dotenv/config";

export default async function BusinessDiscovery(
  id: string,
  name: string,
  token: string
): Promise<string> {
  try {
    // const appId = process.env.CLIENT_ID;
    // const appSecret = process.env.CLIENT_SECRET;
    const yourAccessToken = token;
    const url = `https://graph.facebook.com/v3.2/${id}?fields=business_discovery.username(${name}){media_count,followers_count,profile_picture_url}&access_token=${yourAccessToken}`;

    const response = await axios.get(url);
    const result = response.data;

    return result;
  } catch (error: any) {
    console.log(error);
    console.error(
      "Error while fetching Business Discovery user token:",
      error.message
    );
    throw new Error("Failed to fetch Business Discovery user token.");
  }
}
