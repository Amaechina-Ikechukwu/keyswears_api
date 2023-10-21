import axios from "axios";
import "dotenv/config";

async function GetUserMediaCommentRepliesObjects(
  comment_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${comment_id}/replies?access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching Media Comment Object:", error.message);
    throw new Error("Failed to fetch Media Comment Object.");
  }
}

async function GetCommentRepliesInformation(
  comment_id: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/v18.0/${comment_id}?fields=from,hidden,id,like_count,parent_id,text,timestamp,user,username&access_token=${token}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching CommentData Data:", error.message);
    throw new Error("Failed to fetch CommentData Data.");
  }
}

export default async function GetCommentReplies(
  comment_id: string,
  token: string
): Promise<any[]> {
  try {
    const result = await GetUserMediaCommentRepliesObjects(comment_id, token);
    const commentData: any[] = [];
    for (const item of result.data) {
      const resultInformation = await GetCommentRepliesInformation(
        item.id,
        token
      );

      commentData.push(resultInformation);
    }
    return commentData;
  } catch (error: any) {
    console.error("Error while fetching Comment Replies:", error.message);
    throw new Error("Failed to fetch Comment Replies.");
  }
}
