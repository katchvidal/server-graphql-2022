"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolverExampleQuery = {
    Query: {
        example(root, args, context) {
            console.log('Backend Response: Example Query');
        }
    },
};
exports.default = resolverExampleQuery;
