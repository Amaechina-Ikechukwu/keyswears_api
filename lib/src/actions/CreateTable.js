"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// import supabase from "../../supabase"; // Replace "../../../supabase" with the correct relative path to the supabase module
dotenv_1.default.config();
const createTableFunction = (userid) => {
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
    createTable(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            // const tableName = `userid_${userid}`;
            const client = new pg_1.Client({
                host: process.env.PG_HOST,
                port: 5432,
                database: "postgres",
                user: "postgres",
                password: process.env.PG_PASSWORD,
            });
            try {
                yield client.connect(); // Connect to the database
                yield client.query(createTableFunction(userid));
                // const { error } = await supabase.rpc("rpc/execute-sql", {
                //   query: `ALTER TABLE userid_${userid} ENABLE NOTIFY;`,
                // });
                return "Table created";
            }
            catch (error) {
                console.error("Error creating table: " + error);
                throw new Error("Error creating table: " + error);
            }
            finally {
                yield client.end(); // Disconnect from the database
            }
        });
    }
}
exports.default = TableCreationController;
//# sourceMappingURL=CreateTable.js.map