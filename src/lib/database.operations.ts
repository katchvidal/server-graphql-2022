import { IPagination } from "../interfaces/pagination/pagination.interface";
import { Db } from "mongodb";

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


export const findOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return database.collection(collection).findOne(filter);
};

export const inserOneElement = async (
    database: Db,
    collection: string,
    document: object
) => {
    return database.collection(collection).insertOne(document);
};

export const inserManyElement = async (
    database: Db,
    collection: string,
    document: Array<object>
) => {
    return database.collection(collection).insertMany(document);
};

export const findElement = async (
    database: Db,
    collection: string,
    filter: object = {},
    paginationOption: IPagination = {
        page: 1,
        pages: 1,
        itemsPage: -1,
        skip: 0,
        total: -1,
    }
) => {
    if (paginationOption.total === -1) {
        return await database.collection(collection).find(filter).toArray();
    }
    return await database
        .collection(collection)
        .find(filter)
        .limit(Number(paginationOption.itemsPage))
        .skip(Number(paginationOption.skip))
        .toArray();
};

export const updateOneElement = async (
    database: Db,
    collection: string,
    filter: object,
    updateObject: object
) => {
    return database
        .collection(collection)
        .updateOne(filter, { $set: updateObject });
};

export const deleteOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return database.collection(collection).deleteOne(filter);
};

export const CountElement = async (database: Db, collection: string, filter: object = {}) => {
    return await database.collection(collection).countDocuments(filter);
};

export const randomItems = async (
    database: Db,
    collecion: string,
    filter: object = {},
    items: number = 10
) : Promise<Array<object>> => {
    return new Promise(async (resolve) => {
        const pipeline = [
            { $match: filter },
            { $sample: { size: items } }
        ];
        resolve(await database.collection(collecion).aggregate(pipeline).toArray());
    })
}