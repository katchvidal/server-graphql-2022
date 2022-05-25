import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { MONGOCLIENTURI } from "../configs/constants";
import chalk from "chalk";
// TODO: Class Method to connect With MongoDB

export async function connectToDatabase () {
    dotenv.config();
 
    const client: MongoClient = new MongoClient(MONGOCLIENTURI);
            
    await client.connect();
        
    const db = client.db();
    if (client) {
      console.log(
        ` ${chalk.cyanBright("==================DATABASE===================")}`
      );
      console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
      console.log(`DATABASE NAME: ${chalk.greenBright(db.databaseName)}`);
      console.log(
        ` ${chalk.cyanBright("==================DATABASE===================")}`
      );
    }
    return db;
 }

// import { MongoClient } from "mongodb";
// import chalk from 'chalk';

// class Database {
//   async init() {
//     const MONGO_DB = process.env.MONGOCDN || "";
//     const client = await MongoClient.connect(MONGO_DB);

//     const db = client.db();

//     if (client) {
//       console.log(
//         ` ${chalk.greenBright("==================DATABASE===================")}`
//       );
//       console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
//       console.log(`DATABASE NAME: ${chalk.greenBright(db.databaseName)}`);
//       console.log(
//         ` ${chalk.greenBright("==================DATABASE===================")}`
//       );
//     }

//     return db;
//   }
// }

// export default Database;