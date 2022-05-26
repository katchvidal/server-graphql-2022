import { Db, ObjectId } from "mongodb"; // TODO: ACCESO A LA BASE DE DATOS
import {
  deleteOneElement,
  inserOneElement,
  updateOneElement,
  findElement,
  findOneElement,
} from "../lib/database.operations";    //  TODO: OPERACIONES CON LA BASE DE DATOS
import { IArgumentos } from "../interfaces/resolver/arguments.interface";    //  TODO: INTERFACE DE ARGUMENTOS
import { IContextData } from "../interfaces/resolver/context.interface"; // TODO: INTERFACE DE CONTEXTO
import { pagination } from "../lib/pagination.option";  //  TODO: PAGINACION

class ResolverOperationService {
  private root: object; //  TODO: ->  Como debe de recibirse un objeto de tipo Root(Resolver)
  private args: IArgumentos; //   TODO: ->  Como debe de recibirse un objeto de tipo Args(Resolver)
  private context: IContextData; //  TODO: ->  Como debe de recibirse un objeto de tipo Context(Resolver)
  constructor(root: object, args: object, context: IContextData) {
    this.root = root;
    this.args = args;
    this.context = context;
  }

  //  TODO:  Permite accder a los Argumentos de la peticion
  protected getArgs(): IArgumentos {
    return this.args;
  }

  //  TODO:  Permite Acceder a los elementos de Contexto(Propiedades -> Acceso a la Base de Datos) 
  protected getDB(): Db {
    return this.context.db!;
  }

  //  TODO:  Permite Acceder a los elementos del Contexto(Propiedades) desde los componentes Hijo
  protected getContext(): IContextData {
    return this.context;
  }

  //  TODO: Devuelve Items[] -> Listar Informacion -> Puede reutilizarse cuantas veces sea necesaria variando sus parametros
  protected async list(
    collection: string,
    listElement: string,
    page: number = 1,
    itemsPage: number = 20
  ) {
    try {
      const PaginationData = await pagination(
        this.getDB(),
        collection,
        page, 
        itemsPage 
      );

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
        items: await findElement(this.getDB(), collection, {}, PaginationData),
      };
    } catch (error) {
      return {
        status: false,
        message: `Backend Response: Something Went Wrong With List: ${listElement} We couldnt charged  -> ${error}`,
        items: null,
        info: null,
      };
    }
  }

  //  TODO:  Devuelve Items[] -> Listar Informacion -> Puede reutilizarse cuantas veces sea necesaria variando sus parametros
  protected async listActive(
    collection: string,
    listElement: string,
    page: number = 1,
    itemsPage: number = 20,
    filter : object = { active : { $ne : false } }
  ) {
    try {
      const PaginationData = await pagination(
        this.getDB(),
        collection,
        page, 
        itemsPage ,
        filter
      );

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
        items: await findElement(this.getDB(), collection, filter , PaginationData),
      };
    } catch (error) {
      return {
        status: false,
        message: `Backend Response: Hubo algun Problema Lista ${listElement} no se pudo Cargar  -> ${error}`,
        items: null,
        info: null,
      };
    }
  }

  //  TODO: Obtener detalles del Item -> Un solo Elemento
  protected async getByEmail(collection: string, element: string) {

    try {
      return {
        status: true,
        message: `Backend Response: ${element} ${this.args.email } -> Next Information`,
        item: await findOneElement(this.getDB(), collection, {
          email: this.args.email
        }),
      };
    } catch (error) {
      return {
        status: false,
        message: `Backend Response: No se pudo realizar la operacion anterior en la busqueda del ${element} ${this.args.email}`,
        item: null,
      };
    }
  }

  //  TODO: Obtener detalle del Item -> Un solo elemento by MongoID
//   protected async getbyMongoID(collection: string, element: string) {
//     try {
//       return {
//         status: true,
//         message: `Backend: Response: ${element} ${this.args.id} Seleccionado -> Informacion a Continuacion`,
//         item: await findOneElement(this.getDB(), collection, {
//           _id: new ObjectId(this.getArgs().id )
//         }),
//       };
//     } catch (error) {
//       return {
//         status: false,
//         message: `Backend: Response: No se pudo realizar la operacion anterior en la busqueda del ${element} ${this.args.id}`,
//         item: null,
//       };
//     }
//   }

  //  TODO: Añadir Item -> Agregar un Solo Elemento
  protected async add(collection: string, document: object, item: string) {
    try {
      return await inserOneElement(this.getDB(), collection, document).then(
        (res) => {
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
        }
      );
    } catch (error) {
      return {
        status: false,
        message: `Backend Response: Error Inesperado al Insertar: ${item} intetalo de Nuevo`,
        item: null,
      };
    }
  }
  //  TODO: Modificar Item -> Modificar un solo Elemento
  protected async update(
    collection: string,
    filter: object,
    objectUpdate: object,
    item: string
  ) {
    try {
      return await updateOneElement(
        this.getDB(),
        collection,
        filter,
        objectUpdate
      ).then((res) => {
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
    } catch (error) {
      return {
        status: false,
        message: `Backend Response: El ${item} No se Ha Podido Actualizar Error Inesperado`,
        item: null,
      };
    }
  }
  //  TODO: Eliminar Item -> Elimina un solo Elemento
  protected async delete(collection: string, filter: object, item: string) {
    try {
      return await deleteOneElement(this.getDB(), collection, filter).then(
        (res) => {
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
        }
      );
    } catch (error) {
      return {
        status: false,
        message: `Backend: Response: El ${item} No se Ha podido borrar, Error Inesperado`,
      };
    }
  }
  //  TODO: Eliminar Item -> Elimina un solo Elemento
  protected async deleteByMongoID(collection: string, filter: object, item: string) {
    try {
      return await deleteOneElement(this.getDB(), collection, filter).then(
        (res) => {
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
        }
      );
    } catch (error) {
      return {
        status: false,
        message: `Backend: Response: El ${item} No se Ha podido borrar, Error Inesperado`,
      };
    }
  }
}

export default ResolverOperationService;