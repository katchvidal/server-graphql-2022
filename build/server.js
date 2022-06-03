"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const enviroments_1 = __importDefault(require("./configs/enviroments"));
const schemas_1 = __importDefault(require("./schemas"));
const chalk_1 = __importDefault(require("chalk"));
const database_config_1 = require("./lib/database.config");
//  TODO: CHECK ENVIROMENT 
if (process.env.NODE_ENV !== "production") {
    const env = enviroments_1.default;
}
//  TODO: Main function start config of the server
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT;
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use((0, compression_1.default)());
        const db = yield (0, database_config_1.connectToDatabase)();
        const context = ({ req, connection }) => __awaiter(this, void 0, void 0, function* () {
            const token = (req) ? req.headers.authorization : connection.authorization;
            return { db, token };
        });
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: schemas_1.default,
            introspection: true,
            context
        });
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app });
        app.listen({ port: PORT }, () => console.log("Backend Server URL:", chalk_1.default.greenBright(`🚀 Server ready and listening at http://localhost:${PORT}/graphql`)));
    });
}
//  TODO: AUTO CALL SERVER
main();
