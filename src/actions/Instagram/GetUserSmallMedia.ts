import axios from "axios";
import "dotenv/config";

async function GetUserMediaObjects(userid: string, token: string): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${userid}/media?access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    console.error("Error while fetching Media Object:", error.message);
    throw new Error("Failed to fetch Media Object.");
  }
}

async function GetUserSmallMediaData(media_id: string, token: string): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${media_id}?fields=id,media_type,media_url,owner,timestamp&access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    console.error("Error while fetching Media Small Data:", error.message);
    throw new Error("Failed to fetch Media Small Data.");
  }
}

export default async function GetUserSmallMedia(user_id: string, token: string): Promise<any[]> {
  try {
    const data: any = await GetUserMediaObjects(user_id, token);
    const userData: any[] = [];

    for (const item of data.data) {
      const result = await GetUserSmallMediaData(item.id, token);
      userData.push(result);
    }

    return userData;
  } catch (error:any) {
    console.error("Error while fetching Media Data:", error.message);
    throw new Error("Failed to fetch Media Data.");
  }
}
