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
    const { data, error } = await supabase.from("pages").insert(pagedata);

    if (error) {
      throw new Error(`Error inserting value: ${error.message}`);
    }

    return "Value inserted successfully: " + data;
  } catch (error: any) {
    return "Error inserting value:" + error.message;
  }
};

// Call the function to insert the value
export default insertValueToArrayColumn;
