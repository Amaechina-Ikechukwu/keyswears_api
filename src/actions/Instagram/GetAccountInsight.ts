import axios from "axios";
import "dotenv/config";

export default async function GetAccountInsight(
  user_id: string,
  token: string
): Promise<string> {
  try {
    const url = `https://graph.facebook.com/${user_id}/insights?metric=impressions,reach,profile_views
    &period=day&access_token=${token}`;

    const response = await axios.get(url);
    const result = response.data;

    return result;
  } catch (error: any) {
    console.error("Error while fetching Account Insight:", error.message);
    throw new Error("Failed to fetch Error while fetching Account Insight.");
  }
}
