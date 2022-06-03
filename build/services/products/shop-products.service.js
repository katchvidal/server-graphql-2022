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
class ShopProductsService extends resolver_service_1.default {
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
        this.collection = constants_1.COLLECTIONS.PRODUCTS_PLATFORM;
        this.argumentos = this.getArgs();
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
    //    TODO:->  Permite obtener la collecion de Usuarios Completa
    items(active = constants_1.ACTIVE_FILTER.ACTIVE, platform = '', random = false) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let filter = { active: { $ne: false } };
            if (active === constants_1.ACTIVE_FILTER.ACTIVE) {
                filter = {};
            }
            else if (active === constants_1.ACTIVE_FILTER.INACTIVE) {
                filter = { active: false };
            }
            if (platform !== '' && platform !== undefined) {
                filter = Object.assign(Object.assign({}, filter), { platform_id: platform });
            }
            const page = (_a = this.argumentos.pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.argumentos.pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            if (!random) {
                const result = yield this.list(this.collection, "Shop Products", page, itemsPage, filter);
                return {
                    info: result.info,
                    status: result.status,
                    message: result.message,
                    shopProducts: result.items,
                };
            }
            const result = yield (0, database_operations_1.randomItems)(this.getDB(), this.collection, filter, itemsPage);
            if (result.length === 0 || result.length !== itemsPage) {
                return {
                    info: { page: 1, pages: 1, itemsPage, total: 0 },
                    status: false,
                    message: 'Backend Response: No data from server',
                    shopProducts: [],
                };
            }
            return {
                info: { page: 1, pages: 1, itemsPage, total: itemsPage },
                status: true,
                message: 'Backend Response: Data charged successfull',
                shopProducts: result,
            };
        });
    }
    //    TODO:->  Permite obtener la collecion de Usuarios Active:True Completa
    itemsActive() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const page = (_a = this.argumentos.pagination) === null || _a === void 0 ? void 0 : _a.page;
            const itemsPage = (_b = this.argumentos.pagination) === null || _b === void 0 ? void 0 : _b.itemsPage;
            const result = yield this.listActive(this.collection, "Users", page, itemsPage);
            return {
                info: result.info,
                status: result.status,
                message: result.message,
                users: result.items,
            };
        });
    }
    //    TODO:->  Permite obtener un solo Usuario by Email
    detailsByEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const email = this.argumentos.email;
            if (!this.checkData(String(email))) {
                return {
                    status: false,
                    message: `Backend Response: El Email Viene Vacio o Undefined `,
                    user: [],
                };
            }
            const UserExist = yield this.ExistInDatabasebyEmail(email);
            if (!UserExist) {
                return {
                    status: false,
                    message: `Backend Response: El Email: ${email} No Existe `,
                    user: [],
                };
            }
            const result = yield this.getByEmail(this.collection, "User");
            return {
                status: result.status,
                message: result.message,
                user: result.item,
            };
        });
    }
}
exports.default = ShopProductsService;
