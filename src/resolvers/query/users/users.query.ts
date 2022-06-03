import { IResolvers } from "@graphql-tools/utils";
import chalk from "chalk";
import UserService from "../../../services/users/users.service";


const resolverUserQuery: IResolvers = {
  Query: {
    users(root, { page, itemsPage, active  }, context ){
        console.log( chalk.cyan( 'Backend Response: Get All Users' ))
        return new UserService(root, { pagination: { page, itemsPage } }, context).items( active ) 
    },

    usersActive(root, args, context ){
        console.log( chalk.cyan( 'Backend Response: Get All Users Active:True' ))
        return new UserService(root, args, context).itemsActive() 
    },
    user(root, args, context ){
        console.log( chalk.cyan( 'Backend Response: Detail One User ' ))
        return new UserService(root, args, context).detailsByEmail() 
    },
  },
};

export default resolverUserQuery;