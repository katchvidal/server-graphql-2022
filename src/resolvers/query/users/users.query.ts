import { IResolvers } from "@graphql-tools/utils";
import chalk from "chalk";



const resolverUserQuery: IResolvers = {
  Query: {
    users(root, { page, itemsPage, active  }, context ){
        console.log( chalk.cyan( 'Backend Response: Get All Users' ))
    },
    user(root, args, context ){
        console.log( chalk.cyan( 'Backend Response: Detail One User ' ))

    },
  },
};

export default resolverUserQuery;