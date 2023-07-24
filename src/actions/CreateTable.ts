import { Client } from "pg";
import dotenv from "dotenv";

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
      postid TEXT,
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
    const client = new Client({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT), // Convert the port to a number
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
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
  }
}

export default TableCreationController;
