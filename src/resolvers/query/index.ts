import GMR from "graphql-merge-resolvers";
import resolverAuthQuery from "./auth/auth.query";
import resolverExampleQuery from "./example/example.query";
import resolverShopProductsQuery from "./products/product.query";
import resolverUserQuery from "./users/users.query";



const queryResolvers = GMR.merge([
    resolverExampleQuery,
    resolverUserQuery,
    resolverAuthQuery,
    resolverShopProductsQuery
]);

export default queryResolvers;