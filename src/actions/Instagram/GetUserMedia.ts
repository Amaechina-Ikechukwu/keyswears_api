import axios from "axios";
import "dotenv/config";

export default async function GetUserMedia(
  media_id: string,
  token: string
): Promise<string> {
  try {
    const url = `https://graph.facebook.com/${media_id}/insights?metric=impressions,reach,carousel_album_impressions,carousel_album_reach,carousel_album_engagement,carousel_album_saved,carousel_album_video_views,taps_forward,taps_back,exits,replies,engagement,saved,video_views&period=day&access_token=${token}`;

    const response = await axios.get(url);
    const result = response.data;

    return result;
  } catch (error: any) {
    console.error("Error while fetching Media Insight:", error.message);
    throw new Error("Failed to fetch Error while fetching Media Insight.");
  }
}
