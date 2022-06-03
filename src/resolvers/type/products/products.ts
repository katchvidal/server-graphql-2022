import { IResolvers } from "@graphql-tools/utils";
import PlatformsService from "../../../services/platforms/platforms.service";
import ProductsService from "../../../services/products/products.service";



const resolverProductsType: IResolvers = {
    // El nombre debe ser el tipo de objeto referenciado en los schemas
    Product : {
        screenshoot: ( parent ) => parent.shortScreenshots
    }
};

export default resolverProductsType;