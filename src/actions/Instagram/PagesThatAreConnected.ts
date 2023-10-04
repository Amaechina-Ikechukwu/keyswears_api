import axios from "axios";
import "dotenv/config";

export default async function PagesThatAreConnected(
  token: string
): Promise<string> {
  try {
    const url = `https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`;

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
