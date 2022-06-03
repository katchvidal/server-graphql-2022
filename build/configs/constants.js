"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRETIME = exports.USER_PASSWORD_MAIL = exports.USER_MAIL = exports.ACTIVE_FILTER = exports.MESSAGES = exports.COLLECTIONS = exports.MONGOCLIENTURI = exports.SECRET_KEY = void 0;
const enviroments_1 = __importDefault(require("./enviroments"));
// ! IF THE SERVER IS IN PRODUCTION THIS VALUES NOT CONMING FROM A ENV
if (process.env.NODE_ENV !== "production") {
    const env = enviroments_1.default;
}
//  TODO: JSONWEBTOKEN SECRET KEY
exports.SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY_DEVELOPMENT";
//  TODO: MONGOCDN COLLECTION
exports.MONGOCLIENTURI = process.env.MONGOCDN || 'MONGOCLIENTURI';
// TODO: DATABASE COLLECTIONS NAME
var COLLECTIONS;
(function (COLLECTIONS) {
    COLLECTIONS["USERS"] = "users";
    COLLECTIONS["GENRES"] = "genres";
    COLLECTIONS["TAGS"] = "tags";
    COLLECTIONS["PRODUCTS_PLATFORM"] = "product_platforms";
    COLLECTIONS["PRODUCTS"] = "products";
    COLLECTIONS["PLATFORMS"] = "platforms";
})(COLLECTIONS = exports.COLLECTIONS || (exports.COLLECTIONS = {}));
// TODO: MESSAGES
var MESSAGES;
(function (MESSAGES) {
    MESSAGES["TOKEN_VERIFICATION_FAILED"] = " TOKEN IS INVALID PLEASE SIGN IN AGAIN ";
})(MESSAGES = exports.MESSAGES || (exports.MESSAGES = {}));
var ACTIVE_FILTER;
(function (ACTIVE_FILTER) {
    ACTIVE_FILTER["ALL"] = "ALL";
    ACTIVE_FILTER["ACTIVE"] = "ACTIVE";
    ACTIVE_FILTER["INACTIVE"] = "INACTIVE";
})(ACTIVE_FILTER = exports.ACTIVE_FILTER || (exports.ACTIVE_FILTER = {}));
// TODO: NODEMAILER CONFIGS
exports.USER_MAIL = process.env.USER_EMAIL_PASSWORD_DOS_PASOS || '';
exports.USER_PASSWORD_MAIL = process.env.USER_EMAIL_NAME || '';
//  TODO: EXPIRETIME TOKEN VALUES ( HOUR, 24 HOURS, 15MINUTES, 3DAYS, 20MINUTES)
var EXPIRETIME;
(function (EXPIRETIME) {
    EXPIRETIME[EXPIRETIME["H1"] = 3600] = "H1";
    EXPIRETIME[EXPIRETIME["H24"] = 86400] = "H24";
    EXPIRETIME[EXPIRETIME["M15"] = 900] = "M15";
    EXPIRETIME[EXPIRETIME["M20"] = 1200] = "M20";
    EXPIRETIME[EXPIRETIME["D3"] = 259200] = "D3";
})(EXPIRETIME = exports.EXPIRETIME || (exports.EXPIRETIME = {}));
