import { findOneElement } from "../../lib/database.operations";
import { IArgumentos } from "../../interfaces/resolver/arguments.interface";
import { COLLECTIONS, EXPIRETIME, MESSAGES } from "../../configs/constants";
import { IContextData } from "../../interfaces/resolver/context.interface";
import ResolverOperationService from "../resolver.service";
//import JWT from "../lib/jsonwebtoken";
import bcrypt from "bcrypt";
import JWT from "../../lib/json-web-token";


class AuthService extends ResolverOperationService {


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
    private contexto = this.getContext();


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



    //    TODO:->  Login de Usuario devuelve un token
    async login() {
        const authinput = this.argumentos.user;
        const { email, password } = authinput!
        try {

            const user = await this.ExistInDatabasebyEmail( email )

            if (!user) {
                return {
                    status: false,
                    message: "Backend Response: Usuario No existe",
                    token: null,
                };
            }

            const password_check = bcrypt.compareSync(
                String(password),
                user.password
            );

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
                    : new JWT().sign({ user }, EXPIRETIME.H24),
                user: !password_check ? null : user,
            };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: "Backend Response: No se pudo logguear correctamente",
                token: null,
            };
        }
    }

    //    TODO:->  Verifica que el usuario este autenticado
    async auth() {

        let info = new JWT().verify(String(this.contexto.token));

        if (info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
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
    }

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



export default AuthService;