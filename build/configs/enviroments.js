"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * THE COMMENTS HAVE THIS TYPE OF TEXT & COLORS
 * ?
 * *
 * !
 * TODO
 */
// * ENVIROMENT DEV THE CONFIG COMMING FROM A ENV
const enviroment = dotenv_1.default.config({
    path: './src/.env'
});
// ! IF ENVIROMENT IS A PROD THE CONFIG COMMING FROM A SEVER HOSTER ELSE THROW AN ERROR
if (process.env.NODE_ENV !== 'production') {
    if (enviroment.error) {
        throw enviroment.error;
    }
}
exports.default = enviroment;
