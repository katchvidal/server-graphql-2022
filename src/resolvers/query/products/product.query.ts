import { IResolvers } from "@graphql-tools/utils";

import ShopProductsService from "../../../services/products/shop-products.service";


const resolverShopProductsQuery: IResolvers = {
  Query: {
    shopProducts(root, { page, itemsPage, active, random  }, context ){
        console.log('Backend Response: Get All Products')
        return new ShopProductsService(root, { pagination: { page, itemsPage }}, context ).items( active, '', random  )
    },
    shopProductsPlatforms(root, { page, itemsPage, active, platform, random }, context ){
        console.log('Backend Response: Get All Products by Platforms')
        return new ShopProductsService(root, { pagination: { page, itemsPage }}, context ).items( active, platform, random )
    }
  },
};

export default resolverShopProductsQuery;