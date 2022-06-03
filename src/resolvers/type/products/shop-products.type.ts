import { IResolvers } from "@graphql-tools/utils";
import PlatformsService from "../../../services/platforms/platforms.service";
import ProductsService from "../../../services/products/products.service";



const resolverShopProductsType: IResolvers = {
    // Debe tener nombre del tipo de objeto que haz especificado
    ShopProduct: {
        productId: (parent) => parent.product_id,
        platformIid: (parent) => parent.platform_id,
        product: async (parent, _, context) => {
            const resultado = await new ProductsService(_, { id: parent.product_id }, context).detailsbyNormalId()
            return resultado.product;
        },
        platform: async (parent, _, context) => {
            const resultado = await new PlatformsService(_, { id: parent.platform_id }, context).detailsbyNormalId()
            return resultado.platform;
        },
    },

    Product : {
        screenshoot: ( parent ) => parent.shortScreenshots
    }
};

export default resolverShopProductsType;