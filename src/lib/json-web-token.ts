import JsonWebToekn from 'jsonwebtoken';
import { SECRET_KEY, MESSAGES, EXPIRETIME } from '../configs/constants';
import { IJsonWebToken } from '../interfaces/json-web-token/json-web-token.interface';


class JWT {
    private secretKey = SECRET_KEY

    sign(data: IJsonWebToken, expiresIn : number = EXPIRETIME.H24 ){
        return JsonWebToekn.sign( { User : data.user }, this.secretKey, { expiresIn } );
    }

    verify( token : string ){
        try {

            return JsonWebToekn.verify( token, this.secretKey);

        } catch (error) {

            console.log( error );
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
    
        }
    }
}

export default JWT;

/**
 * Programacion Orientada a objetos
 * 1. Funcion para firmar un token 
 * 2. Verificar un token
 * Need -> :
 * 1.   Key para firmar un token
 * 2.   Objeto de Usuario
 * 3.   Fecha de expiracion 
 */