"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shop_products_service_1 = __importDefault(require("../../../services/products/shop-products.service"));
const resolverShopProductsQuery = {
    Query: {
        shopProducts(root, { page, itemsPage, active, random }, context) {
            console.log('Backend Response: Get All Products');
            return new shop_products_service_1.default(root, { pagination: { page, itemsPage } }, context).items(active, '', random);
        },
        shopProductsPlatforms(root, { page, itemsPage, active, platform, random }, context) {
            console.log('Backend Response: Get All Products by Platforms');
            return new shop_products_service_1.default(root, { pagination: { page, itemsPage } }, context).items(active, platform, random);
        }
    },
};
exports.default = resolverShopProductsQuery;
