import axios from "axios";

class SubscribePages {
  public async PagesToSubscribe(
    pageId: string,
    token: string
  ): Promise<string[]> {
    try {
      const params = {
        subscribed_fields: "feed",
        access_token: token,
      };

      const response = await axios.get(
        `https://graph.facebook.com/${pageId}/subscribed_apps`,
        {
          params,
        }
      );

      // Assuming the response data is an object with an 'accounts' property that contains an array of page objects,
      // extract the 'name' property from each page object and return as an array of strings.
      const pages = response.data;

      return pages;
    } catch (error: any) {
      throw new Error("Error fetching data: " + error);
    }
  }
}

export default SubscribePages;
