import { IResolvers } from "@graphql-tools/utils";

import chalk from "chalk";


const resolversUsersMutation: IResolvers = {
  Mutation: {
    SignUp( root, args , context ){
        console.log( chalk.redBright(' Backend Response: SIGN UP USER ') )

    },
    UpdateUser( root, args , context ){
      console.log( chalk.redBright(' Backend Response: UPDATE AN USER ') )

    }
  },
};

export default resolversUsersMutation;