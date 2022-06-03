import { IResolvers } from "@graphql-tools/utils";




const resolverPlatformType: IResolvers = {
    // Debe tener nombre del tipo de objeto que haz especificado
    Platform: {
        active: ( parent ) => ( parent.active !== false ) ? true : false 
    }
};

export default resolverPlatformType;