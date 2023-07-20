import supabase from "../../../supabase";
import "dotenv/config";

// Define the table and column name
const tableName = "logindetails";

// Insert the value into the array column
const insertValueToArrayColumn = async (page: string, uuid: string) => {
  const userpages = page;
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update({ pages: [userpages] })
      .eq("uuid", uuid);

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
