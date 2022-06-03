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
exports.randomItems = exports.CountElement = exports.deleteOneElement = exports.updateOneElement = exports.findElement = exports.inserManyElement = exports.inserOneElement = exports.findOneElement = void 0;
/**
 *  TODO:Operaciones practicas con la base de datos
 *  *1.  Asignar un id a un documento ( aparte del que por defecto nos proporciona MONGO DB )
 *  *1.  Busca un elemento dentro de la base de datos
 *  *1.  Insertar un elemento dentro de la base de datos
 *  *1.  Insertar varios elementos dentro de la base de datos
 *  *1.  Actualizar un elemento dentro de la base de datos
 *  *1.  Eliminar un elemento dentro de la base de datos
 *  *1.  Permite Contar elementos dentro de una collecion
 */
const findOneElement = (database, collection, filter) => __awaiter(void 0, void 0, void 0, function* () {
    return database.collection(collection).findOne(filter);
});
exports.findOneElement = findOneElement;
const inserOneElement = (database, collection, document) => __awaiter(void 0, void 0, void 0, function* () {
    return database.collection(collection).insertOne(document);
});
exports.inserOneElement = inserOneElement;
const inserManyElement = (database, collection, document) => __awaiter(void 0, void 0, void 0, function* () {
    return database.collection(collection).insertMany(document);
});
exports.inserManyElement = inserManyElement;
const findElement = (database, collection, filter = {}, paginationOption = {
    page: 1,
    pages: 1,
    itemsPage: -1,
    skip: 0,
    total: -1,
}) => __awaiter(void 0, void 0, void 0, function* () {
    if (paginationOption.total === -1) {
        return yield database.collection(collection).find(filter).toArray();
    }
    return yield database
        .collection(collection)
        .find(filter)
        .limit(Number(paginationOption.itemsPage))
        .skip(Number(paginationOption.skip))
        .toArray();
});
exports.findElement = findElement;
const updateOneElement = (database, collection, filter, updateObject) => __awaiter(void 0, void 0, void 0, function* () {
    return database
        .collection(collection)
        .updateOne(filter, { $set: updateObject });
});
exports.updateOneElement = updateOneElement;
const deleteOneElement = (database, collection, filter) => __awaiter(void 0, void 0, void 0, function* () {
    return database.collection(collection).deleteOne(filter);
});
exports.deleteOneElement = deleteOneElement;
const CountElement = (database, collection, filter = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database.collection(collection).countDocuments(filter);
});
exports.CountElement = CountElement;
const randomItems = (database, collecion, filter = {}, items = 10) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const pipeline = [
            { $match: filter },
            { $sample: { size: items } }
        ];
        resolve(yield database.collection(collecion).aggregate(pipeline).toArray());
    }));
});
exports.randomItems = randomItems;
