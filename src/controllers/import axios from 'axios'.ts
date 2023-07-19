import axios, { AxiosRequestConfig } from 'axios';

class GetUserPages {
  public async ListOfPages(userId: string, token: string): Promise<string[]> {
    try {
      const headers: AxiosRequestConfig['headers'] = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      };

      const response = await axios.get(`https://graph.facebook.com/${userId}/accounts`, { headers });

      // Assuming the response data is an object with an 'accounts' property that contains an array of page objects,
      // extract the 'name' property from each page object and return as an array of strings.
      const pages: string[] = response.data;

      return pages;
    } catch (error: any) {
      throw new Error("Error fetching data: " + error);
    }
  }
}

export default GetUserPages;
