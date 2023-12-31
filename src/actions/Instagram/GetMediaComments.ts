import axios from "axios";
import "dotenv/config";

async function GetUserMediaCommentObjects(
  media_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${media_id}/comments?access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching Media Comment Object:", error.message);
    throw new Error("Failed to fetch Media Comment Object.");
  }
}

async function GetCommentInformation(
  comment_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${comment_id}?fields=from,hidden,id,like_count,media,parent_id,replies,text,timestamp,user,username&access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching CommentData Data:", error.message);
    throw new Error("Failed to fetch CommentData Data.");
  }
}

export default async function GetUserMediaComments(
  media_id: string,
  token: string
): Promise<any[]> {
  try {
    const result = await GetUserMediaCommentObjects(media_id, token);
    const commentData: any[] = [];
    for (const item of result.data) {
      const resultInformation = await GetCommentInformation(item.id, token);

      commentData.push(resultInformation);
    }
    return commentData;
  } catch (error: any) {
    console.error("Error while fetching Media Data:", error.message);
    throw new Error("Failed to fetch Media Data.");
  }
}
