import axios from "axios";
import "dotenv/config";

async function UnHideComment(comment_id: string, token: string): Promise<any> {
  try {
    const url = `https://graph.facebook.com/${comment_id}?hide=false&access_token=${token}`;
    const response = await axios.post(url);
    return response.data;
  } catch (error: any) {
    console.error("Error while Hiding CommentData Data:", error.message);
    throw new Error("Failed to Hide CommentData Data.");
  }
}

export default async function UnHideMediaComments(
  comment_id: string,
  token: string
): Promise<any[]> {
  try {
    const result = await UnHideComment(comment_id, token);

    return result;
  } catch (error: any) {
    console.error("Error while Hiding Media comment:", error.message);
    throw new Error("Failed to Hiding Media comment.");
  }
}
