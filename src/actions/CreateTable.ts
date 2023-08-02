import { Client } from "pg";
import dotenv from "dotenv";
// import supabase from "../../supabase";

dotenv.config();

const createTableFunction = (userid: string) => {
  const tableName = `userid_${userid}`;
  const createTable = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      from_name TEXT,
      from_id TEXT,
      post JSONB,
      message TEXT,
      pageid TEXT,
      createdtime BIGINT,
      comment_id TEXT,
      item TEXT,
      parentid TEXT,
      verb TEXT,
      field TEXT,
      reaction_type TEXT,
      pagehash TEXT,
      action_statement TEXT
    )
  `;
  return createTable;
};

class TableCreationController {
  public async createTable(userid: string): Promise<string> {
    // const tableName = `userid_${userid}`;
    const client = new Client({
      host: process.env.PG_HOST,
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: process.env.PG_PASSWORD,
    });

    try {
      await client.connect(); // Connect to the database

      await client.query(createTableFunction(userid));

      return "Table created";
    } catch (error: any) {
      console.error("Error creating table: " + error);
      throw new Error("Error creating table: " + error);
    } finally {
      await client.end(); // Disconnect from the database
    }
    // try {
    //   // Call the RPC function with the required parameters
    //   await supabase.rpc("refresh_schema");
    //   const { data, error } = await supabase.rpc("create_table", {
    //     table_name: tableName,
    //   });

    //   if (error) {
    //     throw new Error(error.message);
    //   }
    //   console.log({ data });
    //   return data;
    // } catch (error: any) {
    //   console.log({ error });
    //   return error.message;
    // }
  }
}

export default TableCreationController;
