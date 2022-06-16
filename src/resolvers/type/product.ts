
import { IResolvers } from "@graphql-tools/utils";

const resolversProductType: IResolvers = {
  Product : {
    screenshoot: (parent) => parent.shortScreenshots
  }
};

export default resolversProductType;