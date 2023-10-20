import axios from "axios";
import "dotenv/config";

async function ReplyComment(
  comment_id: string,
  message: string,
  token: string
): Promise<any> {
  try {
    const url = `https://graph.facebook.com/${comment_id}/replies?message=${message}&access_token=${token}`;
    const response = await axios.post(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while fetching CommentData Data:", error.message);
    throw new Error("Failed to fetch CommentData Data.");
  }
}

export default async function CommentReply(
  comment_id: string,
  message: string,
  token: string
): Promise<any[]> {
  try {
    const result = await ReplyComment(comment_id, message, token);

    return result;
  } catch (error: any) {
    console.error("Error while fetching Media Data:", error.message);
    throw new Error("Failed to fetch Media Data.");
  }
}
