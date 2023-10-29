import jwt from 'jsonwebtoken';
import enviarEmail from '../../services/enviarEmail';
import { NextApiRequest , NextApiResponse } from 'next';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { UsuarioModel } from '../../models/UsuarioModel';
import { politicaCORS } from '../../middlewares/CORS';

const endpointAlterarASenha = async (req:NextApiRequest, res:NextApiResponse) => {
            if(req.method === 'GET' ) {

                const { JWT_SECRET } = process.env

                    const id  = req.body.id
                    const token = req.body.token

                    const usuarioExiste = await UsuarioModel.findById(id)
                    if(!usuarioExiste || usuarioExiste.length < 1) {
                        return res.status(400).json("Usuario Nao Existente")
                    }
                    const usuario = usuarioExiste[0]
                    const secret = JWT_SECRET + usuario.senha
                    try {
                        const payload = jwt.verify( token, secret)
                        return res.status(200).json("Token e usuario Validos")
                    } catch(error) {
                        console.log(error)
                        return res.status(404).json("Token Invalido")
                    }


                  
            }

            if(req.method === 'POST') {
                
            }
}

export default politicaCORS(conectarBancoDeDados(endpointAlterarASenha))