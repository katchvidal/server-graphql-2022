/**
 * Fichero -> Interfaz de Contexto Global del Servidor
 * 1.   Recibe una request 
 * 2.   Conexion ( web socket? )
 * 1.1  Request -> puede contener cabezeras ( headers ) -> A su vez un cliente nos puede enviar un Token ( Authorization )
 * 2.1  Connection -> Token de Conexion
 */


 export interface IContextServer {
    req: IRequest;
    connection: IConnection;
    transport?: any
}



interface IRequest {
    headers:{
        authorization:string
    };
}


interface IConnection {
    authorization: string;
}