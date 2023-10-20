import axios from "axios";
import "dotenv/config";

async function DeleteComment(comment_id: string, token: string): Promise<any> {
  try {
    const url = `https://graph.facebook.com/${comment_id}?access_token=${token}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while Deleting CommentData Data:", error.message);
    throw new Error("Failed to fetch CommentData Data.");
  }
}

export default async function DeleteMediaComments(
  comment_id: string,
  token: string
): Promise<any[]> {
  try {
    const result = await DeleteComment(comment_id, token);

    return result;
  } catch (error: any) {
    console.error("Error while Deleting Media comment:", error.message);
    throw new Error("Failed to Deleting Media comment.");
  }
}
