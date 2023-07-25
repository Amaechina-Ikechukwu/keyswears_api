import supabase from "../../../supabase";

class UserPages {
  public async GetUserPages(uuid: string) {
    const { error, data } = await supabase
      .from("pages")
      .select()
      .eq("uuid", uuid);
    if (error) {
      throw new Error(`Error getting data ${error.message}`);
    } else {
      return data;
    }
  }
}
export default UserPages;
