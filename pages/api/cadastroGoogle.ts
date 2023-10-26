import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { politicaCORS } from '../../middlewares/CORS';
import { validarGoogleToken } from '../../middlewares/validarGoogleToken';
import { UsuarioGoogleModel } from '../../models/UsuarioGoogleModel';


const endpointGoogle = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {


    if (req.method === 'POST') {
        const googleTokenResponse = req.body.googleTokenResponse
            if(googleTokenResponse.valid != true) {
                return res.status(498).json("Token Google Inválido")
            }
  
            const userInfo = googleTokenResponse.user

       const usuarioASerCriado = {
            googleId: userInfo.sub,
            nome: userInfo.name,
            email: userInfo.email,
            avatar: userInfo.picture
       }

            await UsuarioGoogleModel.create(usuarioASerCriado)
            return res.status(200).json("Usuario Cadastrado com o Google com Sucesso!")

    }
    return res.status(405).json({ erro: 'Metodo Informado nao e valido' })
}

export default politicaCORS(validarGoogleToken(conectarBancoDeDados(endpointGoogle)));