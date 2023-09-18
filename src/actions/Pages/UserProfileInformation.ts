import axios from "axios";
import supabase from "../../../supabase";

export class UserProfileInformation {
  private readonly baseUrl: string;

  constructor(apiVersion: string) {
    this.baseUrl = `https://graph.facebook.com/${apiVersion}`;
  }

  async getPersonData(uuid: string): Promise<any> {
    let { data: logindetails, error } = await supabase
      .from("logindetails")
      .select("userid,token")
      .eq("uuid", uuid);
    if (error) {
      throw new Error(error.message);
    }
    const url = `${this.baseUrl}/${logindetails[0].userid}?fields=id,name,email,picture&access_token=${logindetails[0].token}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
