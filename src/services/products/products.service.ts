import { findOneElement } from "../../lib/database.operations";
import { IArgumentos } from "../../interfaces/resolver/arguments.interface";
import { ACTIVE_FILTER, COLLECTIONS, EXPIRETIME, MESSAGES } from "../../configs/constants";
import { IContextData } from "../../interfaces/resolver/context.interface";
import ResolverOperationService from "../resolver.service";


class ProductsService extends ResolverOperationService {


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
    private collection = COLLECTIONS.PRODUCTS;
    private argumentos = this.getArgs();


    constructor(root: object, args: IArgumentos, context: IContextData) {
        super(root, args, context);
    }
    //    *->  Permite comprobar si la informacion viene vacia / undefined
    private checkData(value: string) {
        return value === "" || value === undefined ? false : true;
    }
    //    *->  Permite comprobar si existe en base de Datos por ID
    private async ExistInDatabase(value: any) {
        return await findOneElement(this.getDB(), this.collection, { "id": value });
    }


    //    TODO:->  Permite obtener un solo Usuario by Email
    async detailsbyNormalId() {

        const id = this.argumentos.id
        if (!this.checkData(String(id))) {
            return {
                status: false,
                message: `Backend Response: El ID Viene Vacio o Undefined `,
                product: [],
            };
        }

        const Product = await this.ExistInDatabase(id);
        if (!Product) {
            return {
                status: false,
                message: `Backend Response: El ID: ${id} No Existe `,
                product: [],
            };
        }
        const result = await this.getbyID(this.collection, "Product");
        return {
            status: result.status,
            message: result.message,
            product: result.item,
        };
    }



}



export default ProductsService;