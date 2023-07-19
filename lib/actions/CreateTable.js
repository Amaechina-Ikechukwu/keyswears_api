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
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
    host: process.env.PG_HOST,
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: process.env.PG_PASSWORD,
});
const createTableFunction = (userid) => {
    const tableName = `userid_${userid}`;
    const createTable = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY
    )
  `;
    return createTable;
};
class TableCreationController {
    createTable(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect(); // Connect to the database
                yield client.query(createTableFunction(userid));
                return "Table created";
            }
            catch (error) {
                console.error("Error creating table: " + error);
                throw new Error("Error creating table: " + error);
            }
            finally {
                // Do not disconnect the client here
            }
        });
    }
}
exports.default = TableCreationController;
//# sourceMappingURL=CreateTable.js.map