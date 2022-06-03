"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
const constants_1 = require("../configs/constants");
const chalk_1 = __importDefault(require("chalk"));
// TODO: Class Method to connect With MongoDB
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const client = new mongodb_1.MongoClient(constants_1.MONGOCLIENTURI);
        yield client.connect();
        const db = client.db();
        if (client) {
            console.log(` ${chalk_1.default.cyanBright("==================DATABASE===================")}`);
            console.log(`STATUS: ${chalk_1.default.greenBright("ONLINE")}`);
            console.log(`DATABASE NAME: ${chalk_1.default.greenBright(db.databaseName)}`);
            console.log(` ${chalk_1.default.cyanBright("==================DATABASE===================")}`);
        }
        return db;
    });
}
exports.connectToDatabase = connectToDatabase;
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
