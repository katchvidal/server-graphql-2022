#   Backend GraphQL - NodeJS - Typescript - Apollo - Express

![flujo de trabajo de ejemplo](https://github.com/katchvidal/server-graphql-2022/actions/workflows/artifact.yml/badge.svg)
-   URL: https://server-graphql-2022.vercel.app/graphql
-   Login user: kia@correo.com
-   Login Password: 123456
*   Security Risk Register & Updates are disable sorry!!!
```
    1.  Comenzamos el backend server ( 2022 ) Lo mas robusto posible
    2.  Tecnologias a Usar:
        -   Typescript
        -   Graphql
        -   NodeJs
        -   Express
        -   Apollo
        -   MongoDB
        -   Github Actions
        -   Docker
```


##  Estructura Basica del Proyecto
```
    -   src
        -   lib
        -   config
        -   interfaces
        -   resolvers
        -   schemas
        -   services
```

##  Programando Nodemon
```
    -   Package.json
        -   "scripts": {
                "start": "node build/server.js",
                "build": "tsc -p .",
                "dev": "nodemon \"src/server.ts\" --exec \"ts-node\" \"src/server.ts\" -e ts,graphql,json"
            },
```
##  Configuraciones Iniciales
```
    -   Configuraciones iniciales variables de ambiente y enviroments desarrollo y Produccion
    -   Configuraciones
        -   enviroments.ts
```

##  Solucionando Problemas con Type en Graphql
```
    cuando obtenemos un valor nulo cuando especifcamos que no queremos un valor nulo
    para eso usaremos resolver de tipo esto pasa porque la propiedad que especificamos dentro de un tipo de objeto cambiando su nombre
    eg: platform_id -> cambio a platformId 
    para ello usaremos el resolver de tipo
    
```

##  Deploy in Vercel
```
    1.  Follow the Docs Deploy in vercel 02-06-2022 Mexico City
    1.1 vercel.json
        {
            "version": 2,
            "builds": [
                {
                    "src": "build/server.js",
                    "use": "@vercel/node",
                    "config": {
                        "includeFiles": [ "build/schemas/**/*.graphql" ]
                    }
                }
            ],
            "routes": [
                {
                    "src": "/.*",
                    "dest": "build/server.js"
                }
            ]
        }
    1.2 package.json
        scripts: {
            "publish": "npm run build && npx vercel --prod "
        }
    
    1.3 Command CLI -> yarn run publish ( you can if your case npm run publish or other package manager )

    2. In vercel.com
    settings: enviroment give a vercel enviroment keys 

    extra:
        maybe show an error yarn version .....
        i fix with this in package.json:
        "engines": {
            "node": ">=16.*.*",
            "yarn": ">=1.22.*",
            "npm": ">=8.11.0*"
        }
```