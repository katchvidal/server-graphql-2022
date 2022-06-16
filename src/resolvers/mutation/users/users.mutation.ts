import { IResolvers } from "@graphql-tools/utils";
import UserService from "../../../services/users/users.service";
import chalk from "chalk";


const resolversUsersMutation: IResolvers = {
  Mutation: {
    SignUp( root, args , context ){
        console.log( chalk.redBright(' Backend Response: SIGN UP USER ') )
        return new UserService( root, args , context).register()
    },
    UpdateUser( root, args , context ){
      console.log( chalk.redBright(' Backend Response: UPDATE AN USER ') )
      //return new UserService( root, args , context).modify()
    }
  },
};

export default resolversUsersMutation;