import supabase from "../../../supabase";
import "dotenv/config";
import { validate as uuidValidate } from "uuid"; // Import uuid4 generator

// Define the table and column name

// Insert the value into the array column
const insertValueToArrayColumn = async (page: any, uuid: string) => {
  const userpages = page;
  if (!uuidValidate(uuid)) {
    throw new Error("Invalid unique identifier (uuid)");
  }
  const pagedata = {
    access_token: userpages?.access_token,
    name: userpages?.name,
    pageid: userpages?.id,
    uuid: uuid,
    category: userpages?.category,
    task: userpages?.tasks,
    category_list_id: userpages?.category_list.id,
    category_list_name: userpages?.category_list.name,
  };
  try {
    if ((await DoesPageExist(userpages?.id)) === false) {
      const { data, error } = await supabase.from("pages").insert(pagedata);
      if (error) {
        throw new Error(`Error inserting value: ${error.message}`);
      }

      return "Value inserted successfully: " + data;
    } else {
      const { data, error } = await supabase
        .from("pages")
        .update(pagedata)
        .eq("pageid", userpages?.id);
      if (error) {
        throw new Error(`Error inserting value: ${error.message}`);
      }

      return "Value inserted successfully: " + data;
    }
  } catch (error: any) {
    return "Error inserting value:" + error.message;
  }
};

async function DoesPageExist(pageid: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from(`pages`)
      .select("*")
      .eq("pageid", pageid);

    return !(!data || data.length === 0); // Return true if data is not empty, otherwise false
  } catch (error) {
    return false; // Return false if there's an error
  }

  // Explicitly return false if the try block did not return anything (TypeScript error fix)
}

// Call the function to insert the value
export default insertValueToArrayColumn;
