import supabase from "../../../supabase";
class RecordPageWebhooks {
  public async PageChanges(
    userid: string,
    pagedata: string[]
  ): Promise<string[] | string> {
    const { error: insertRowError, data } = await supabase
      .from(`userid_${userid}`)
      .insert(pagedata)
      .select();
    if (insertRowError) {
      throw new Error(`Error adding data ${insertRowError}`);
    } else {
      return data;
    }
  }
}
export default RecordPageWebhooks;
