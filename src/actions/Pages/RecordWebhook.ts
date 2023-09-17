import supabase from "../../../supabase"; // Replace "../../../supabase" with the correct relative path to the supabase module

const hash = require("object-hash");

class RecordPageWebhooks {
  public async PageChanges(
    userid: string,
    pdata: any
  ): Promise<string[] | string> {
    const pagedata = pdata.value;
    const pagehash = hash(pagedata);
    const checkhash = await this.DoesPageHashExist(userid, pagehash);
    const { user, name } = await this.GetPageDetails(
      pagedata.post_id.split("_")[0]
    );
    const datafrompage = {
      from_id: pagedata.from.id || null,
      from_name: pagedata.from.name || null,
      post: [pagedata.post] || null,
      pageid: pagedata.post_id || null,
      comment_id: pagedata.comment_id || null,
      createdtime: pagedata.created_time || null,
      item: pagedata.item || null,
      parentid: pagedata.parent_id || null,
      verb: pagedata.verb || null,
      field: pdata.field || null,
      reaction_type: pagedata.reaction_type || null,
      pagehash: pagehash,
      message: pagedata.message || null,
      pagename: name,
      userid: user,
    };
    try {
      if (!checkhash) {
        const { error: insertRowError } = await supabase
          .from(`page_notifications`)
          .insert(datafrompage);

        if (insertRowError) {
          console.log(insertRowError.message);
          throw new Error(`Error adding data ${insertRowError.message}`);
        } else {
          const data = "done";
          return data;
        }
      } else {
        console.log("same page data");
      }
    } catch (error: any) {
      console.log(error);
      throw new Error("error" + error);
    }
    return "done";
  }
  public async GetPageDetails(
    pageid: string
  ): Promise<{ name: any; user: any }> {
    try {
      const { data } = await supabase
        .from(`pages`)
        .select("*")
        .eq("pageid", pageid);

      const detail = {
        name: data[0].name,
        user: data[0].uuid,
      };
      return detail; // Return true if data is not empty, otherwise false
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public async DoesPageHashExist(
    userid: string,
    pagehash: string
  ): Promise<boolean> {
    try {
      const { data } = await supabase
        .from(`page_notifications`)
        .select("*")
        .eq("pagehash", pagehash);

      return !(!data || data.length === 0); // Return true if data is not empty, otherwise false
    } catch (error) {
      return false; // Return false if there's an error
    }

    // Explicitly return false if the try block did not return anything (TypeScript error fix)
  }
}

export default RecordPageWebhooks;
