import axios from "axios";

class SubscribePages {
  public async PagesToSubscribe(pages: any): Promise<string[]> {
    console.log(pages.id);
    try {
      const pageid = pages.id;
      const formData = new URLSearchParams();
      formData.append("subscribed_fields", "feed");
      formData.append("access_token", pages.access_token);

      const response = await axios.post(
        `https://graph.facebook.com/${pageid}/subscribed_apps`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const result = response.data;
      return result;
    } catch (error: any) {
      console.error("Error response status:", error.response?.status);
      console.error("Error response data:", error.response?.data);
      throw new Error("Error fetching data: " + error);
    }
  }
}

export default SubscribePages;
