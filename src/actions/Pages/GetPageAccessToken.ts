import supabase from "../../../supabase";
class GetPageAccessToken {
  /**
   * async PageAccessToken
   */
  public async PageAccessToken(pageid: string) {
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("access_token")
        .eq("pageid", pageid)
        .single();
      if (error) {
        // Log the error for debugging purposes

        throw new Error(`Error getting data: ${error.message}`);
      }

      // Return the userid if data is available
      return data?.access_token;
    } catch (error: any) {
      throw new Error(`Error get page from database ${error}`);
    }
  }
}
export default GetPageAccessToken;
