import axios from "axios";
import "dotenv/config";

async function GetUserMediaChildrenObjects(
  media_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${media_id}/children?access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching Media Object:", error.message);
    throw new Error("Failed to fetch Media Object.");
  }
}

async function GetUserCarouselMediaData(
  media_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${media_id}?fields=id,media_type,media_url,username,timestamp&access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching Media Carousel Data:", error.message);
    throw new Error("Failed to fetch Media Carousel Data.");
  }
}
async function GetUserFullMediaData(
  media_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${media_id}?fields=id,ig_id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,owner,permalink,shortcode,thumbnail_url,timestamp,username,caption,comments_count&access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching Media Full Data:", error.message);
    throw new Error("Failed to fetch Media Full Data.");
  }
}

export default async function GetUserFullMedia(
  type: string,
  media_id: string,
  token: string
): Promise<any[]> {
  try {
    if (type === "CAROUSEL_ALBUM") {
      const fullMediaData = await GetUserFullMediaData(media_id, token);
      const mediaChildren = await GetUserMediaChildrenObjects(media_id, token);
      const userData: any[] = [];

      for (const item of mediaChildren.data) {
        const carouselMediaData = await GetUserCarouselMediaData(
          item.id,
          token
        );
        userData.push(carouselMediaData);
      }
      const data = Object.assign(fullMediaData, { children: userData });
      return data;
    } else {
      const fullMediaData = await GetUserFullMediaData(media_id, token);
      return fullMediaData;
    }
  } catch (error: any) {
    console.error("Error while fetching Media Data:", error.message);
    throw new Error("Failed to fetch Media Data.");
  }
}
