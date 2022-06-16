import GMR from "graphql-merge-resolvers";
import resolversUsersMutation from './users/users.mutation'

const mutationResolvers = GMR.merge([
    resolversUsersMutation 
]);

export default mutationResolvers;