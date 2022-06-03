"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const auth_query_1 = __importDefault(require("./auth/auth.query"));
const example_query_1 = __importDefault(require("./example/example.query"));
const product_query_1 = __importDefault(require("./products/product.query"));
const users_query_1 = __importDefault(require("./users/users.query"));
const queryResolvers = graphql_merge_resolvers_1.default.merge([
    example_query_1.default,
    users_query_1.default,
    auth_query_1.default,
    product_query_1.default
]);
exports.default = queryResolvers;
