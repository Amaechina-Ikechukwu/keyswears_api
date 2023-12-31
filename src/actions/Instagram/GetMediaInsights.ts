import axios from "axios";
import "dotenv/config";

export default async function GetMediaInsight(
  media_id: string,
  token: string
): Promise<string> {
  try {
    const url = `https://graph.facebook.com/${media_id}/insights?metric=total_interactions,impressions,reach,saved,video_views&access_token=${token}`;

    const response = await axios.get(url);
    const result = response.data;

    return result;
  } catch (error: any) {
    console.error("Error while fetching Media Insight:", error.message);
    throw new Error("Failed to fetch Error while fetching Media Insight.");
  }
}
