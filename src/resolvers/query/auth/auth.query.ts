import { IResolvers } from "@graphql-tools/utils";
import chalk from "chalk";




const resolverAuthQuery: IResolvers = {
  Query: {
    SignIn(root, { email, password }, context) {
      console.log(chalk.green.bold('Backend Response: Sign In User'))

    },

    Auth(root, args, context) {
      console.log(chalk.green.bold('Backend Response: Authorization User'))

    },
  },
};

export default resolverAuthQuery;