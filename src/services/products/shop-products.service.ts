import { findOneElement, randomItems } from "../../lib/database.operations";
import { IArgumentos } from "../../interfaces/resolver/arguments.interface";
import { ACTIVE_FILTER, COLLECTIONS, EXPIRETIME, MESSAGES } from "../../configs/constants";
import { IContextData } from "../../interfaces/resolver/context.interface";
import ResolverOperationService from "../resolver.service";


class ShopProductsService extends ResolverOperationService {


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
    private collection = COLLECTIONS.PRODUCTS_PLATFORM;
    private argumentos = this.getArgs();


    constructor(root: object, args: IArgumentos, context: IContextData) {
        super(root, args, context);
    }
    //    *->  Permite comprobar si la informacion viene vacia / undefined
    private checkData(value: string) {
        return value === "" || value === undefined ? false : true;
    }
    //    *->  Permite comprobar si existe en base de Datos por MongoID
    private async ExistInDatabase(value: any) {
        return await findOneElement(this.getDB(), this.collection, { "_id": value });
    }
    //    *->  Permite Comprobar si existe en la base de datos por id normal ( string )
    private async ExistInDatabasebyEmail(value: any) {
        return await findOneElement(this.getDB(), this.collection, { email: value });
    }


    //    TODO:->  Permite obtener la collecion de Usuarios Completa
    async items(active: string = ACTIVE_FILTER.ACTIVE, platform: string = '', random: boolean = false) {
        let filter: object = { active: { $ne: false } }
        if (active === ACTIVE_FILTER.ACTIVE) {
            filter = {}
        } else if (active === ACTIVE_FILTER.INACTIVE) {
            filter = { active: false }
        }

        if (platform !== '' && platform !== undefined) {
            filter = { ...filter, ...{ platform_id: platform } }
        }
        const page = this.argumentos.pagination?.page;
        const itemsPage = this.argumentos.pagination?.itemsPage;

        if (!random) {

            const result = await this.list(
                this.collection,
                "Shop Products",
                page,
                itemsPage,
                filter
            );
            return {
                info: result.info,
                status: result.status,
                message: result.message,
                shopProducts: result.items,
            };
        }

        const result: Array<object> = await randomItems( this.getDB(), this.collection, filter,  itemsPage );
        if ( result.length === 0 || result.length !== itemsPage ){
            return {
                info: { page : 1 , pages: 1, itemsPage, total: 0  },
                status: false,
                message: 'Backend Response: No data from server',
                shopProducts: [],
            }
        }

        return {
            info: { page : 1 , pages: 1, itemsPage, total: itemsPage  },
            status: true,
            message: 'Backend Response: Data charged successfull',
            shopProducts: result,
        }
    }

    //    TODO:->  Permite obtener la collecion de Usuarios Active:True Completa
    async itemsActive() {
        const page = this.argumentos.pagination?.page;
        const itemsPage = this.argumentos.pagination?.itemsPage;

        const result = await this.listActive(
            this.collection,
            "Users",
            page,
            itemsPage
        );
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            users: result.items,
        };
    }

    //    TODO:->  Permite obtener un solo Usuario by Email
    async detailsByEmail() {

        const email = this.argumentos.email
        if (!this.checkData(String(email))) {
            return {
                status: false,
                message: `Backend Response: El Email Viene Vacio o Undefined `,
                user: [],
            };
        }

        const UserExist = await this.ExistInDatabasebyEmail(email);
        if (!UserExist) {
            return {
                status: false,
                message: `Backend Response: El Email: ${email} No Existe `,
                user: [],
            };
        }
        const result = await this.getByEmail(this.collection, "User");
        return {
            status: result.status,
            message: result.message,
            user: result.item,
        };
    }



}



export default ShopProductsService;