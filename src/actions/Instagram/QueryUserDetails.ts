import supabase from "../../../supabase";

/**
 * GetUserId
 */

export default async function QueryUserDetails(uuid: string) {
  try {
    const { data, error } = await supabase
      .from("logindetails")
      .select("*")
      .eq("uuid", uuid)
      .single();

    if (error) {
      // Log the error for debugging purposes
      console.error("Supabase query error:", error);
      throw new Error(`Error getting data: ${error.message}`);
    }

    // Return the userid if data is available
    return data;
  } catch (error) {
    // Handle any other potential errors
    console.error("Error retrieving user ID:", error);
    throw new Error("An error occurred while fetching the user ID.");
  }
}
