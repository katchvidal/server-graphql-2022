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
const database_operations_1 = require("../../lib/database.operations");
const constants_1 = require("../../configs/constants");
const resolver_service_1 = __importDefault(require("../resolver.service"));
//import JWT from "../lib/jsonwebtoken";
const bcrypt_1 = __importDefault(require("bcrypt"));
const json_web_token_1 = __importDefault(require("../../lib/json-web-token"));
class AuthService extends resolver_service_1.default {
    constructor(root, args, context) {
        super(root, args, context);
        /**
         * User.Service.Ts -> Funcionalidad de MiddleWare controla las validaciones antes de poder hacer modificaciones a la aplicacion
         *                     como Peticiones y modificaciones a la base de datos
         * Contiene la collecion de Mongo a la que apunta este fichero -> Collecion de Usuarios ( Users )
         * Constructor ( parametros u atributos que contiene este fichero al heredar o extender -> Contiene todos los argumentos, contexto y root del servidor )
         * 1. List
         * 2. GetOne
         * 3. Login
         * 4. Auth
         * 5. Register
         * 6. Modify ( Update )
         * 7. Delete
         */
        //  TODO: COLLECCION USED IN THIS FILE ( USER )
        this.collection = constants_1.COLLECTIONS.USERS;
        this.argumentos = this.getArgs();
        this.contexto = this.getContext();
    }
    //    *->  Permite comprobar si la informacion viene vacia / undefined
    checkData(value) {
        return value === "" || value === undefined ? false : true;
    }
    //    *->  Permite comprobar si existe en base de Datos por MongoID
    ExistInDatabase(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, database_operations_1.findOneElement)(this.getDB(), this.collection, { "_id": value });
        });
    }
    //    *->  Permite Comprobar si existe en la base de datos por id normal ( string )
    ExistInDatabasebyEmail(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, database_operations_1.findOneElement)(this.getDB(), this.collection, { email: value });
        });
    }
    //    TODO:->  Login de Usuario devuelve un token
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const authinput = this.argumentos.user;
            const { email, password } = authinput;
            try {
                const user = yield this.ExistInDatabasebyEmail(email);
                if (!user) {
                    return {
                        status: false,
                        message: "Backend Response: Usuario No existe",
                        token: null,
                    };
                }
                const password_check = bcrypt_1.default.compareSync(String(password), user.password);
                if (password_check !== null) {
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
                return {
                    status: !password_check ? false : true,
                    message: !password_check
                        ? "Backend Response: Password y/o Usuario No son Validos"
                        : "Backend Response: Sesion Iniciada Correctamente",
                    token: !password_check
                        ? null
                        : new json_web_token_1.default().sign({ user }, constants_1.EXPIRETIME.H24),
                    user: !password_check ? null : user,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: "Backend Response: No se pudo logguear correctamente",
                    token: null,
                };
            }
        });
    }
    //    TODO:->  Verifica que el usuario este autenticado
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            let info = new json_web_token_1.default().verify(String(this.contexto.token));
            if (info === constants_1.MESSAGES.TOKEN_VERIFICATION_FAILED) {
                return {
                    status: false,
                    message: `Backend Response: ${info}`,
                    user: null,
                };
            }
            return {
                status: true,
                message: "Backend Response: Usuario Autenticado Correctamente Mediante Token",
                user: Object.values(info)[0],
            };
        });
    }
}
exports.default = AuthService;
