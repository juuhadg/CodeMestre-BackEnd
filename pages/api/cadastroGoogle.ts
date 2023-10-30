import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { politicaCORS } from '../../middlewares/CORS';
import { validarGoogleToken } from '../../middlewares/validarGoogleToken';
import { UsuarioGoogleModel } from '../../models/UsuarioGoogleModel';
const axios = require('axios');




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

            const usuarioJaExiste = await UsuarioGoogleModel.find({ $or: [ { googleId: userInfo.sub }, { email: userInfo.email } ] });
                console.log(usuarioJaExiste)
                if((usuarioJaExiste &&  usuarioJaExiste.length > 0)) {
                        return res.status(400).json("Esse Usuário Já Existe!, faça login")

                    }

                    


       const usuarioASerCriado = {
            googleId: userInfo.sub,
            nome: userInfo.name,
            email: userInfo.email,
            avatar: userInfo.picture,
            usuarioDoGoogle: true,
       }


           await UsuarioGoogleModel.create(usuarioASerCriado)
           return res.status(200).json("Usuario Cadastrado com o Google com Sucesso!")

    }
    return res.status(405).json({ erro: 'Metodo Informado nao e valido' })
}

export default politicaCORS(validarGoogleToken(conectarBancoDeDados(endpointGoogle)));