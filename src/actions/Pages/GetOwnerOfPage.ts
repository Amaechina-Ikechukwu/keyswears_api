import supabase from "../../../supabase";

class GetOwnerOfThePage {
  public async PageOwner(pageid: string) {
    const { error, data } = await supabase
      .from("pages")
      .select()
      .eq("pageid", pageid);

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(`Error finding user pages: ${error.message}`);
    } else {
      const uid = data[0]?.uuid;
      return uid;
    }
  }
}

export default GetOwnerOfThePage;
