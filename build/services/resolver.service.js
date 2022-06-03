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
const database_operations_1 = require("../lib/database.operations"); //  TODO: OPERACIONES CON LA BASE DE DATOS
const pagination_option_1 = require("../lib/pagination.option"); //  TODO: PAGINACION
class ResolverOperationService {
    constructor(root, args, context) {
        this.root = root;
        this.args = args;
        this.context = context;
    }
    //  TODO:  Permite accder a los Argumentos de la peticion
    getArgs() {
        return this.args;
    }
    //  TODO:  Permite Acceder a los elementos de Contexto(Propiedades -> Acceso a la Base de Datos) 
    getDB() {
        return this.context.db;
    }
    //  TODO:  Permite Acceder a los elementos del Contexto(Propiedades) desde los componentes Hijo
    getContext() {
        return this.context;
    }
    //  TODO: Devuelve Items[] -> Listar Informacion -> Puede reutilizarse cuantas veces sea necesaria variando sus parametros
    list(collection, listElement, page = 1, itemsPage = 20, filter = { active: { $ne: false } }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PaginationData = yield (0, pagination_option_1.pagination)(this.getDB(), collection, page, itemsPage, filter);
                return {
                    info: {
                        page: PaginationData.page,
                        pages: PaginationData.pages,
                        itemsPage: PaginationData.itemsPage,
                        total: PaginationData.total,
                        skip: PaginationData.skip,
                    },
                    status: true,
                    message: `Backend Response: List ${listElement} Charged Succesfull `,
                    items: yield (0, database_operations_1.findElement)(this.getDB(), collection, filter, PaginationData),
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend Response: Something Went Wrong With List: ${listElement} We couldnt charged  -> ${error}`,
                    items: null,
                    info: null,
                };
            }
        });
    }
    //  TODO:  Devuelve Items[] -> Listar Informacion -> Puede reutilizarse cuantas veces sea necesaria variando sus parametros
    listActive(collection, listElement, page = 1, itemsPage = 20, filter = { active: { $ne: false } }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const PaginationData = yield (0, pagination_option_1.pagination)(this.getDB(), collection, page, itemsPage, filter);
                return {
                    info: {
                        page: PaginationData.page,
                        pages: PaginationData.pages,
                        itemsPage: PaginationData.itemsPage,
                        total: PaginationData.total,
                        skip: PaginationData.skip,
                    },
                    status: true,
                    message: `Backend Response: List ${listElement} Charged Succesfull `,
                    items: yield (0, database_operations_1.findElement)(this.getDB(), collection, filter, PaginationData),
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend Response: Hubo algun Problema Lista ${listElement} no se pudo Cargar  -> ${error}`,
                    items: null,
                    info: null,
                };
            }
        });
    }
    //  TODO: Obtener detalles del Item -> Un solo Elemento
    getByEmail(collection, element) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    status: true,
                    message: `Backend Response: ${element} ${this.args.email} -> Next Information`,
                    item: yield (0, database_operations_1.findOneElement)(this.getDB(), collection, {
                        email: this.args.email
                    }),
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend Response: No se pudo realizar la operacion anterior en la busqueda del ${element} ${this.args.email}`,
                    item: null,
                };
            }
        });
    }
    //TODO: Obtener detalle del Item -> Un solo elemento by ID
    getbyID(collection, element) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    status: true,
                    message: `Backend: Response: ${element} ${this.args.id} Seleccionado -> Informacion a Continuacion`,
                    item: yield (0, database_operations_1.findOneElement)(this.getDB(), collection, {
                        id: this.getArgs().id
                    }),
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend: Response: No se pudo realizar la operacion anterior en la busqueda del ${element} ${this.args.id}`,
                    item: null,
                };
            }
        });
    }
    //  TODO: Añadir Item -> Agregar un Solo Elemento
    add(collection, document, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, database_operations_1.inserOneElement)(this.getDB(), collection, document).then((res) => {
                    if (res) {
                        return {
                            status: true,
                            message: `Backend Response: CREATE NEW ONE ${item} `,
                            item: document,
                        };
                    }
                    return {
                        status: false,
                        message: `Backend Response: WE COULD NOT ADD A: ${item} TRY AGAIN`,
                        item: null,
                    };
                });
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend Response: Error Inesperado al Insertar: ${item} intetalo de Nuevo`,
                    item: null,
                };
            }
        });
    }
    //  TODO: Modificar Item -> Modificar un solo Elemento
    update(collection, filter, objectUpdate, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, database_operations_1.updateOneElement)(this.getDB(), collection, filter, objectUpdate).then((res) => {
                    if (res) {
                        return {
                            status: true,
                            message: `Backend Response: El ${item} Se ha Actualizado Correctamente `,
                            item: Object.assign({}, filter, objectUpdate),
                        };
                    }
                    return {
                        status: false,
                        message: `Backend Response: El ${item} No se Ha Podido Actualizar Error Inesperado Intentelo de nuevo`,
                        item: null,
                    };
                });
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend Response: El ${item} No se Ha Podido Actualizar Error Inesperado`,
                    item: null,
                };
            }
        });
    }
    //  TODO: Eliminar Item -> Elimina un solo Elemento
    delete(collection, filter, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, database_operations_1.deleteOneElement)(this.getDB(), collection, filter).then((res) => {
                    if (res.deletedCount === 1) {
                        return {
                            status: true,
                            message: `Backend: Response: El ${item} Se ha Borrado Correctamente `,
                        };
                    }
                    return {
                        status: false,
                        message: `Backend: Response: El ${item} No se Ha podido borrar, intentalo de nuevo `,
                    };
                });
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend: Response: El ${item} No se Ha podido borrar, Error Inesperado`,
                };
            }
        });
    }
    //  TODO: Eliminar Item -> Elimina un solo Elemento
    deleteByMongoID(collection, filter, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, database_operations_1.deleteOneElement)(this.getDB(), collection, filter).then((res) => {
                    if (res.deletedCount === 1) {
                        return {
                            status: true,
                            message: `Backend: Response: El ${item} Se ha Borrado Correctamente `,
                        };
                    }
                    return {
                        status: false,
                        message: `Backend: Response: El ${item} No se Ha podido borrar, intentalo de nuevo `,
                    };
                });
            }
            catch (error) {
                return {
                    status: false,
                    message: `Backend: Response: El ${item} No se Ha podido borrar, Error Inesperado`,
                };
            }
        });
    }
}
exports.default = ResolverOperationService;
