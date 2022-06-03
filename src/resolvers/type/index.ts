import GMR from "graphql-merge-resolvers";
import resolverPlatformType from "./platforms/platforms.type";
import resolverProductsType from "./products/products";
import resolverShopProductsType from "./products/shop-products.type";

const typeResolvers = GMR.merge([
    resolverShopProductsType,
    resolverPlatformType,
    resolverProductsType,
]);

export default typeResolvers;