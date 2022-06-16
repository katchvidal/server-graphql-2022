import GMR from "graphql-merge-resolvers";
import resolverAuthQuery from "./auth/auth.query";
import resolverUserQuery from "./users/users.query";



const queryResolvers = GMR.merge([
    resolverUserQuery,
    resolverAuthQuery,
]);

export default queryResolvers;