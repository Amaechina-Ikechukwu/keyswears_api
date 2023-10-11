import axios from "axios";

class SubscribePages {
  public async PagesToSubscribe(pages: {
    id: string;
    access_token: string;
  }): Promise<any> {
    try {
      const pageid = pages.id;
      const formData = new URLSearchParams();
      formData.append("subscribed_fields", "feed");
      formData.append("access_token", pages.access_token);

      const response = await axios.post(
        `https://graph.facebook.com/${pageid}/subscribed_apps`,
        formData.toString(), // Use formData.toString() to send the data as a URL-encoded string
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const result = response.data;

      return result;
    } catch (error: any) {
      throw new Error("Error fetching data: " + error);
    }
  }
}

export default SubscribePages;
