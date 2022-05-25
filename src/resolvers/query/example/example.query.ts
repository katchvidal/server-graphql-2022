import { IResolvers } from "@graphql-tools/utils";


const resolverExampleQuery: IResolvers = {
  Query: {
    example(root, args, context ){
        console.log('Backend Response: Example Query')
       
    }
  },
};

export default resolverExampleQuery;