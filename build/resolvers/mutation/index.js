"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_merge_resolvers_1 = __importDefault(require("graphql-merge-resolvers"));
const example_mutation_1 = __importDefault(require("./example/example.mutation"));
const users_mutation_1 = __importDefault(require("./users/users.mutation"));
const mutationResolvers = graphql_merge_resolvers_1.default.merge([
    example_mutation_1.default,
    users_mutation_1.default
]);
exports.default = mutationResolvers;
