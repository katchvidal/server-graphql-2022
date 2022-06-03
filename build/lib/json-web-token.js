"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../configs/constants");
class JWT {
    constructor() {
        this.secretKey = constants_1.SECRET_KEY;
    }
    sign(data, expiresIn = constants_1.EXPIRETIME.H24) {
        return jsonwebtoken_1.default.sign({ User: data.user }, this.secretKey, { expiresIn });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (error) {
            console.log(error);
            return constants_1.MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}
exports.default = JWT;
/**
 * Programacion Orientada a objetos
 * 1. Funcion para firmar un token
 * 2. Verificar un token
 * Need -> :
 * 1.   Key para firmar un token
 * 2.   Objeto de Usuario
 * 3.   Fecha de expiracion
 */ 
