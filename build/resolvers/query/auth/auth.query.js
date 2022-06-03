"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const auth_service_1 = __importDefault(require("../../../services/auth/auth.service"));
const resolverAuthQuery = {
    Query: {
        SignIn(root, { email, password }, context) {
            console.log(chalk_1.default.green.bold('Backend Response: Sign In User'));
            return new auth_service_1.default(root, { user: { email, password } }, context).login();
        },
        Auth(root, args, context) {
            console.log(chalk_1.default.green.bold('Backend Response: Authorization User'));
            return new auth_service_1.default(root, args, context).auth();
        },
    },
};
exports.default = resolverAuthQuery;
