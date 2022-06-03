"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const users_service_1 = __importDefault(require("../../../services/users/users.service"));
const resolverUserQuery = {
    Query: {
        users(root, { page, itemsPage, active }, context) {
            console.log(chalk_1.default.cyan('Backend Response: Get All Users'));
            return new users_service_1.default(root, { pagination: { page, itemsPage } }, context).items(active);
        },
        usersActive(root, args, context) {
            console.log(chalk_1.default.cyan('Backend Response: Get All Users Active:True'));
            return new users_service_1.default(root, args, context).itemsActive();
        },
        user(root, args, context) {
            console.log(chalk_1.default.cyan('Backend Response: Detail One User '));
            return new users_service_1.default(root, args, context).detailsByEmail();
        },
    },
};
exports.default = resolverUserQuery;
