import { ObjectId } from "mongodb";
import { IPagination } from "../pagination/pagination.interface";
import { IUser } from "../users/users.interface";

export interface IArgumentos {

  _id?          : ObjectId
  genre?        : string;
  active?       : Boolean;
  user?         : IUser;
  pagination?   : IPagination;
  email?        : string;
  id?           : string | number;
  platform?     : string;

}