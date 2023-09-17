import { Client } from "pg";
import dotenv from "dotenv";
// import supabase from "../../supabase"; // Replace "../../../supabase" with the correct relative path to the supabase module

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
      // const { error } = await supabase.rpc("rpc/execute-sql", {
      //   query: `ALTER TABLE userid_${userid} ENABLE NOTIFY;`,
      // });

      return "Table created";
    } catch (error: any) {
      console.error("Error creating table: " + error);
      throw new Error("Error creating table: " + error);
    } finally {
      await client.end(); // Disconnect from the database
    }
  }
}

export default TableCreationController;
