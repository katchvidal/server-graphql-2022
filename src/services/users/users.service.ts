import { findOneElement } from "../../lib/database.operations";
import { IArgumentos } from "../../interfaces/resolver/arguments.interface";
import { COLLECTIONS, EXPIRETIME, MESSAGES } from "../../configs/constants";
import { IContextData } from "../../interfaces/resolver/context.interface";
import ResolverOperationService from "../resolver.service";
//import JWT from "../lib/jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

class UserService extends ResolverOperationService {


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
    private collection = COLLECTIONS.USERS;
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

    //    TODO:->  SIGN UP A USER IN DATABASE
    async register() {
        const user = this.argumentos.user
        //  TODO:-> EMAIL IS ALREADY EXIST?
        const UserExist = await this.ExistInDatabasebyEmail(String( user!.email ));
        if (UserExist) {
            return {
                status: false,
                message: `Backend Response: El email [ ${user?.email} ] Ya esta Registrado`,
                user: null,
            };
        }

        // TODO:-> FECHA DE CREACION EN FORMATO ISOSTRING
        user!.createAT = new Date().toISOString();
        //  TODO:-> ENCRIPTAR PASSWORD
        user!.password = bcrypt.hashSync(String(user?.password), 11);
        //  TODO:-> TODOS LOS USUARIOS POR DEFAULT VIENEN ACTIVOS
        user!.active = true
        //  TODO:-> GUARDAR USUARIO EN COLLECION
        const result = await this.add(this.collection, user!, "USER");
        return {
            status: result.status,
            message: result.message,
            user: result.item,
        };
    }

    //    TODO:->  Permite obtener la collecion de Usuarios Completa
    async items() {
        const page = this.argumentos.pagination?.page;
        const itemsPage = this.argumentos.pagination?.itemsPage;

        const result = await this.list(
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

    // //    ->  Permite obtener un solo Usuario
    // async details() {
    //     /**
    //      * Validaciones
    //      * 0. Extraer el ID del Input Argumento
    //      * 1. Que no venga vacio el ID
    //      * 1.1  Convertir el ID en ObjectID de Mongo
    //      * 2. Exista en base de datos
    //      * 
    //      */
    //     const { id } = this.getArgs()
    //     if (!this.checkData(String(id))) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El ID Viene Vacio o Undefined `,
    //             user: [],
    //         };
    //     }
    //     const MongoID = new ObjectId(id)
    //     const UserExist = await this.ExistInDatabase(MongoID);
    //     if (!UserExist) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El ID: ${id} No Existe `,
    //             user: [],
    //         };
    //     }
    //     const result = await this.getbyMongoID(this.collection, "User");
    //     return {
    //         status: result.status,
    //         message: result.message,
    //         user: result.item,
    //     };
    // }
    // //    ->  Login de Usuario devuelve un token
    // async login() {
    //     const argumentos = this.getArgs().user;
    //     const { email, password } = argumentos!
    //     try {

    //         const user = await findOneElement(this.getDB(), this.collection, { email });

    //         if (!user) {
    //             return {
    //                 status: false,
    //                 message: "Usuario No existe",
    //                 token: null,
    //             };
    //         }

    //         const password_check = bcrypt.compareSync(
    //             String(password),
    //             user.password
    //         );

    //         if (password_check !== null) {
    //             delete user.password;
    //             delete user.birthday;
    //             delete user.registerDate;
    //         }

    //         return {
    //             status: !password_check ? false : true,
    //             message: !password_check
    //                 ? "Password y/o Usuario No son Validos"
    //                 : "Sesion Iniciada Correctamente",
    //             token: !password_check
    //                 ? null
    //                 : new JWT().sign({ user }, EXPIRETIME.H24),
    //             user: !password_check ? null : user,
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             status: false,
    //             message: "Error -> No se pudo logguear correctamente",
    //             token: null,
    //         };
    //     }
    // }
    // //    ->  Verifica que el usuario este autenticado
    // async auth() {

    //     let info = new JWT().verify(String(this.getContext().token));

    //     if (info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
    //         return {
    //             status: false,
    //             message: info,
    //             user: null,
    //         };
    //     }
    //     return {
    //         status: true,
    //         message: "Usuario Autenticado Correctamente Mediante Token",
    //         user: Object.values(info)[0],
    //     };
    // }

    // //    ->  Permite Modificar al Usuario[Sus Propiedades]
    // async modify() {
    //     const user = this.getArgs().user;
    //     const MongoID = new ObjectId(user?._id)
    //     const search = await findOneElement(this.getDB(), this.collection, { _id: MongoID });
    //     //  Comprobar id -> No venga Vacio / Undefine
    //     if (!search) {
    //         return {
    //             status: false,
    //             message: `El Field ID del Usuario Viene Vacio / undefine `,
    //             user: null,
    //         };
    //     }
    //     //  Quiere Actualizar la Contraseña -> Si viene Haga la siguiente Logica Si no que continue
    //     if (user?.password) {
    //         user!.password = bcrypt.hashSync(String(user?.password), 11);
    //         let ObjectUser = {
    //             name: user.name,
    //             lastname: user.lastname,
    //             password: user.password,
    //             email: user.email,
    //             role: user.role,
    //             createAt: search.createAT,
    //             birthDay: search.birthDay
    //         }
    //         const result = await this.update(
    //             this.collection,
    //             { _id: MongoID },
    //             ObjectUser,
    //             "User"
    //         );
    //         return {
    //             status: result.status,
    //             message: result.message,
    //             user: result.item,
    //         };
    //     }
    //     //  Objetos(fields) -> Actualizar
    //     let ObjectUser = {
    //         name: user?.name,
    //         lastname: user?.lastname,
    //         password: search.password,
    //         email: user?.email,
    //         role: user?.role,
    //         createAt: search.createAT,
    //         birthDay: search.birthDay
    //     }
    //     const result = await this.update(
    //         this.collection,
    //         { _id: MongoID },
    //         ObjectUser,
    //         "User"
    //     );
    //     return {
    //         status: result.status,
    //         message: result.message,
    //         user: result.item,
    //     };
    // }
    // //    ->  Permite Borrar un Usuario
    // async erease() {
    //     const id = this.getArgs().id;
    //     //  Comprobar id -> No venga Vacio / Undefine
    //     if (!this.checkData(String(id))) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El Field ID del Usuario Viene Vacio / undefine `,
    //             genre: null,
    //         };
    //     }
    //     const MongoID = new ObjectId(id)
    //     const User = await this.ExistInDatabase(MongoID);
    //     if (!User) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El ID: ${MongoID} No Existe `,
    //             user: [],
    //         };
    //     }
    //     const result = await this.deleteByMongoID(this.collection, { _id: MongoID }, "User ");
    //     return {
    //         status: result.status,
    //         message: result.message,
    //         user: User,
    //     };
    // }

    // async block() {
    //     const id = this.getArgs().id
    //     const checkId = await this.checkData(String(id))
    //     if (!checkId) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El Field ID del Genero Viene Vacio / undefine `,
    //         };
    //     }
    //     const MongoID = new ObjectId(id)
    //     const search = await findOneElement(this.getDB(), this.collection, { _id: MongoID });
    //     if (!search) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El ID: ${id} No existe en Base de Datos `,
    //         };
    //     }
    //     // -> Actualizar 
    //     let objectUpdate = {
    //         name: search.name,
    //         lastname: search.lastname,
    //         password: search.password,
    //         email: search.email,
    //         role: search.role,
    //         createAt: search.createAT,
    //         birthDay: search.birthDay,
    //         active: false
    //     };
    //     const result = await this.update(
    //         this.collection,
    //         { _id: MongoID },
    //         objectUpdate,
    //         "User"
    //     );
    //     return {
    //         status: result.status,
    //         message: result.message,
    //         user: result.item,
    //     };
    // }

    // async unblock() {
    //     const id = this.getArgs()._id
    //     const checkId = await this.checkData(String(id))
    //     if (!checkId) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El Field ID del Genero Viene Vacio / undefine `,
    //         };
    //     }
    //     const MongoID = new ObjectId(id)
    //     const search = await findOneElement(this.getDB(), this.collection, { _id: MongoID });
    //     if (!search) {
    //         return {
    //             status: false,
    //             message: `Backend Response: El ID: ${id} No existe en Base de Datos `,
    //         };
    //     }
    //     // -> Actualizar 
    //     let objectUpdate = {
    //         name: search.name,
    //         lastname: search.lastname,
    //         password: search.password,
    //         email: search.email,
    //         role: search.role,
    //         createAt: search.createAT,
    //         birthDay: search.birthDay,
    //         active: true
    //     };
    //     const result = await this.update(
    //         this.collection,
    //         { _id: MongoID },
    //         objectUpdate,
    //         "User"
    //     );
    //     return {
    //         status: result.status,
    //         message: result.message,
    //         user: result.item,
    //     };
    // }

}

export default UserService;