import { ObjectId } from "mongodb";

export interface IUser {
  
  _id?: ObjectId;
  name?: String;
  lastname?: String;
  email?: String;
  password?: String;
  birthday?: String;
  role?: String;
  createAT?: String;
  active?: boolean;

}