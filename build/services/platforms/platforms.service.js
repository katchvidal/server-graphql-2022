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
class PlatformsService extends resolver_service_1.default {
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
        this.collection = constants_1.COLLECTIONS.PLATFORMS;
        this.argumentos = this.getArgs();
    }
    //    *->  Permite comprobar si la informacion viene vacia / undefined
    checkData(value) {
        return value === "" || value === undefined ? false : true;
    }
    //    *->  Permite comprobar si existe en base de Datos por ID
    ExistInDatabase(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, database_operations_1.findOneElement)(this.getDB(), this.collection, { "id": value });
        });
    }
    //    TODO:->  Permite obtener la collecion de Usuarios Completa
    items(platform = '') {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let filter = { active: { $ne: false } };
            const page = (_a = this.argumentos.pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.argumentos.pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            const result = yield this.list(this.collection, "Shop Products", page, itemsPage);
            return {
                info: result.info,
                status: result.status,
                message: result.message,
                shoProducts: result.items,
            };
        });
    }
    //    TODO:->  Permite obtener un solo Usuario by Email
    detailsbyNormalId() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.argumentos.id;
            if (!this.checkData(String(id))) {
                return {
                    status: false,
                    message: `Backend Response: El ID Viene Vacio o Undefined `,
                    shopPlatforms: [],
                };
            }
            const Product = yield this.ExistInDatabase(id);
            if (!Product) {
                return {
                    status: false,
                    message: `Backend Response: El ID: ${id} No Existe `,
                    shopPlatforms: [],
                };
            }
            const result = yield this.getbyID(this.collection, "Product");
            return {
                status: result.status,
                message: result.message,
                platform: result.item,
            };
        });
    }
}
exports.default = PlatformsService;
