import axios from "axios";
import supabase from "../../../supabase";

class GetListOfPages {
  public async ListOfPages(userId: string, uuid: string): Promise<string[]> {
    const usertoken = await this.GetUserToken(uuid);

    try {
      const response = await axios.get(
        `https://graph.facebook.com/${userId}/accounts?access_token=${usertoken}`,
        {
          params: {
            access_token: usertoken,
          },
        }
      );

      // Assuming the response data is an object with an 'accounts' property that contains an array of page objects,
      // extract the 'name' property from each page object and return as an array of strings.
      const pages = response.data;

      return pages;
    } catch (error: any) {
      console.error("Error response status:", error.response?.status);
      console.error("Error response data:", error.response?.data);
      throw new Error("Error fetching data: " + error);
    }
  }
  public async GetUserToken(uuid: string) {
    const { error, data } = await supabase
      .from("logindetails")
      .select()
      .eq("uuid", uuid);
    if (error) {
      throw new Error(`Error adding data ${error}`);
    } else {
      const token = data[0].token;
      return token;
    }
  }
}

export default GetListOfPages;
