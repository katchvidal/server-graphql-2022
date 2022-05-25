import { IResolvers } from "@graphql-tools/utils";
import chalk from "chalk";
import UserService from "../../../services/users/users.service";


const resolverUserQuery: IResolvers = {
  Query: {
    users(root, args, context ){
        console.log( chalk.cyan( 'Backend Response: Get All Users' ))
        return new UserService(root, args, context).items() 
    },

    usersActive(root, args, context ){
        console.log( chalk.cyan( 'Backend Response: Get All Users Active:True' ))
        return new UserService(root, args, context).itemsActive() 
    }
  },
};

export default resolverUserQuery;