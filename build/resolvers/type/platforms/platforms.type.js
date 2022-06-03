"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolverPlatformType = {
    // Debe tener nombre del tipo de objeto que haz especificado
    Platform: {
        active: (parent) => (parent.active !== false) ? true : false
    }
};
exports.default = resolverPlatformType;
