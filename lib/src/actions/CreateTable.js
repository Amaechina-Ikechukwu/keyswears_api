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
// import { Client } from "pg";
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_1 = __importDefault(require("../../supabase"));
dotenv_1.default.config();
// const createTableFunction = (userid: string) => {
//   const tableName = `userid_${userid}`;
//   const createTable = `
//     CREATE TABLE IF NOT EXISTS ${tableName} (
//       id SERIAL PRIMARY KEY,
//       from_name TEXT,
//       from_id TEXT,
//       post JSONB,
//       message TEXT,
//       postid TEXT,
//       createdtime BIGINT,
//       comment_id TEXT,
//       item TEXT,
//       parentid TEXT,
//       verb TEXT,
//       field TEXT,
//       reaction_type TEXT,
//       pagehash TEXT,
//       action_statement TEXT
//     )
//   `;
//   return createTable;
// };
class TableCreationController {
    createTable(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            // const client = new Client({
            //   host: process.env.PG_HOST,
            //   port: Number(process.env.PG_PORT), // Convert the port to a number
            //   database: process.env.PG_DATABASE,
            //   user: process.env.PG_USER,
            //   password: process.env.PG_PASSWORD,
            // });
            // try {
            //   await client.connect(); // Connect to the database
            //   await client.query(createTableFunction(userid));
            //   return "Table created";
            // } catch (error: any) {
            //   console.error("Error creating table: " + error);
            //   throw new Error("Error creating table: " + error);
            // } finally {
            //   await client.end(); // Disconnect from the database
            // }
            try {
                // Call the RPC function with the required parameters
                const { data, error } = yield supabase_1.default.rpc("webhook", {
                    userid,
                });
                if (error) {
                    throw new Error(error.message);
                }
                console.log({ data });
                return data;
            }
            catch (error) {
                console.log({ error });
                return error.message;
            }
        });
    }
}
exports.default = TableCreationController;
//# sourceMappingURL=CreateTable.js.map