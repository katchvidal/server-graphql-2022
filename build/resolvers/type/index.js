"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const platforms_type_1 = __importDefault(require("./platforms/platforms.type"));
const products_1 = __importDefault(require("./products/products"));
const shop_products_type_1 = __importDefault(require("./products/shop-products.type"));
const typeResolvers = graphql_merge_resolvers_1.default.merge([
    shop_products_type_1.default,
    platforms_type_1.default,
    products_1.default,
]);
exports.default = typeResolvers;
