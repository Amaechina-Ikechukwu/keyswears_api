import axios from "axios";
import GetPageAccessToken from "../../actions/Pages/GetPageAccessToken";

interface Result {
  id: string;
}
interface Data {
  pageid: string;
  message: string;
  commentid: string;
}

class ReplyComment {
  /**
   * async Reply
   */
  public async Reply(data: Data): Promise<Result | undefined> {
    try {
      const pageAccessToken = await new GetPageAccessToken().PageAccessToken(
        data.pageid
      );
      const response = await axios.post(
        `https://www.graph.facebook.com/${data.commentid}/comments`,
        {
          message: `${data.message}, @[{user-id}]`,
          access_token: pageAccessToken,
        }
      );

      const result: Result = response.data;
      return result;
    } catch (error) {
      console.error("Error occurred:", error);
      throw new Error(`Error posting comment: ${error}`);
    }
  }
}
export default ReplyComment;
