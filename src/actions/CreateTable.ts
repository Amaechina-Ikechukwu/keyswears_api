const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.PG_HOST,
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: process.env.PG_PASSWORD,
});

const createTableFunction = (userid: string) => {
  const tableName = `userid_${userid}`; // Prefixing with "u" to create a valid table name
  const createTable = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
    
    )
  `;
  return createTable;
};

class TableCreationController {
  public async createTable(userid: string): Promise<string> {
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
