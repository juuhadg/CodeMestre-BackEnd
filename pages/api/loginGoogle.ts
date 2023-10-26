import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { politicaCORS } from '../../middlewares/CORS';
import { validarGoogleToken } from '../../middlewares/validarGoogleToken';
import { UsuarioGoogleModel } from '../../models/UsuarioGoogleModel';
import jwt from 'jsonwebtoken';





const endpointLoginGoogle = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

        
    const { JWT_KEY } = process.env;
    if (!JWT_KEY) {
        return res.status(500).json({ erro: 'ENV JWT Nao informada' })
    }



    if (req.method === 'POST') {
        const googleTokenResponse = req.body.googleTokenResponse
            if(googleTokenResponse.valid != true) {
                return res.status(498).json("Token Google Inválido")
            }
  
            const userInfo = googleTokenResponse.user

               
               


       const usuarioALogar = {
            googleId: userInfo.sub,
            email: userInfo.email,
            usuarioDoGoogle: true,
       }

       const usuarioExiste = await UsuarioGoogleModel.find(usuarioALogar)
       if(!usuarioExiste || usuarioExiste.length < 1) {
        return res.status(400).json('Usuario Nao Encontrado, faça seu Cadastro!')
       }

       const usuarioEncontrado = usuarioExiste[0]
       const token = jwt.sign({ _id: usuarioEncontrado._id }, JWT_KEY);


       return res.status(200).json({
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        token
    });

        

    }
    return res.status(405).json({ erro: 'Metodo Informado nao e valido' })
}

export default politicaCORS(validarGoogleToken(conectarBancoDeDados(endpointLoginGoogle)));