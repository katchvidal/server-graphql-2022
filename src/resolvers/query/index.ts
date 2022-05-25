import GMR from "graphql-merge-resolvers";
import resolverExampleQuery from "./example/example.query";
import resolverUserQuery from "./users/users.query";



const queryResolvers = GMR.merge([
    resolverExampleQuery,
    resolverUserQuery
]);

export default queryResolvers;