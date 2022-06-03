"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const resolversUsersMutation = {
    Mutation: {
        SignUp(root, args, context) {
            console.log(chalk_1.default.redBright(' Backend Response: SIGN UP USER '));
            //return new UserService( root, args , context).register()
        },
        UpdateUser(root, args, context) {
            console.log(chalk_1.default.redBright(' Backend Response: UPDATE AN USER '));
            //return new UserService( root, args , context).modify()
        }
    },
};
exports.default = resolversUsersMutation;
