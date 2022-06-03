"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./query")); // -> Es li mismo que si la direccion a la que apuntara fuera ./query/index.ts
const mutation_1 = __importDefault(require("./mutation")); // -> Es li mismo que si la direccion a la que apuntara fuera ./mutation/index.ts
const type_1 = __importDefault(require("./type"));
const resolvers = Object.assign(Object.assign(Object.assign({}, query_1.default), mutation_1.default), type_1.default);
exports.default = resolvers;
