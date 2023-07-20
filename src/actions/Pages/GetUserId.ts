import supabase from "../../../supabase";

/**
 * GetUserId
 */
class UserId {
  public async GetUserId(uuid: string) {
    const { error, data } = await supabase
      .from("logindetails")
      .select()
      .eq("uuid", uuid);
    if (error) {
      throw new Error(`Error adding data ${error}`);
    } else {
      console.log(data);
      return data;
    }
  }
}
export default UserId;
