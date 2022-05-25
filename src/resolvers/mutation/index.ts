import GMR from "graphql-merge-resolvers";
import resolversExampleMutation from "./example/example.mutation";
import resolversUsersMutation from './users/users.mutation'

const mutationResolvers = GMR.merge([
    resolversExampleMutation,
    resolversUsersMutation
    
    
]);

export default mutationResolvers;