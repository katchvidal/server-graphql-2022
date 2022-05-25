import { Db } from "mongodb";

export interface IContextData {
  db?: Db;
  token?: String;
}

/**
 * *Informacion que podemos recibir atraves del contexto de la aplicacion
 * *db -> Curso para hacer uso de la conexion a la base de datos
 * *token -> Recibir por cabezeras ( headers frontend ) un token para poder verificaro y validar si un
 *          usuario esta authenticado.
 */