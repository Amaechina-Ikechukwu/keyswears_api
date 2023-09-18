import axios from "axios";

export class UserProfileInformation {
  private readonly baseUrl: string;

  constructor(apiVersion: string) {
    this.baseUrl = `https://graph.facebook.com/v${apiVersion}`;
  }

  async getPersonData(personId: string): Promise<any> {
    const url = `${this.baseUrl}/${personId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
