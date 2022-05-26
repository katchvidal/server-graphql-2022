import { IResolvers } from "@graphql-tools/utils";
import chalk from "chalk";
import AuthService from "../../../services/auth/auth.service";



const resolverAuthQuery: IResolvers = {
  Query: {
    SignIn(root, { email, password }, context ){
        console.log( chalk.green.bold( 'Backend Response: Sign In User' ))
        return new AuthService(root, { user: { email, password } }, context).login() 
    },

    Auth(root, args, context ){
        console.log( chalk.green.bold( 'Backend Response: Authorization User' ))
        return new AuthService(root, args, context).auth() 
    },
  },
};

export default resolverAuthQuery;