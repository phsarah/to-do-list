import dotenv from "dotenv";
import knex from "knex";
import {Knex} from 'knex';

dotenv.config();

export default class BaseDatabase {

   protected static connection: Knex = knex({
      client: "mysql",
      connection: {
         host: process.env.DB_HOST,
         port: Number(process.env.PORT || "3306"),
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_DATABASE_NAME,
      },
   });

   public static async destroyConnection(): Promise<void> {
      await BaseDatabase.connection.destroy();
   }
}
