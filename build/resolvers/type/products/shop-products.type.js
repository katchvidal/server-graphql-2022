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
const platforms_service_1 = __importDefault(require("../../../services/platforms/platforms.service"));
const products_service_1 = __importDefault(require("../../../services/products/products.service"));
const resolverShopProductsType = {
    // Debe tener nombre del tipo de objeto que haz especificado
    ShopProduct: {
        productId: (parent) => parent.product_id,
        platformIid: (parent) => parent.platform_id,
        product: (parent, _, context) => __awaiter(void 0, void 0, void 0, function* () {
            const resultado = yield new products_service_1.default(_, { id: parent.product_id }, context).detailsbyNormalId();
            return resultado.product;
        }),
        platform: (parent, _, context) => __awaiter(void 0, void 0, void 0, function* () {
            const resultado = yield new platforms_service_1.default(_, { id: parent.platform_id }, context).detailsbyNormalId();
            return resultado.platform;
        }),
    },
    Product: {
        screenshoot: (parent) => parent.shortScreenshots
    }
};
exports.default = resolverShopProductsType;
