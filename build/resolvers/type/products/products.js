"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolverProductsType = {
    // El nombre debe ser el tipo de objeto referenciado en los schemas
    Product: {
        screenshoot: (parent) => parent.shortScreenshots
    }
};
exports.default = resolverProductsType;
