import supabase from "../../../supabase";

class GetOwnerOfThePage {
  /**
   * async function PageOwner
   */
  public async PageOwner(pageid: string) {
    const { error, data } = await supabase
      .from("logindetails")
      .select()
      .match({ pages: { pageid: pageid } });

    if (error) {
      throw new Error(`Error finding user pages ${error}`);
    } else {
      const uid = data[0]?.userid;
      return uid;
    }
  }
}

export default GetOwnerOfThePage;
