import jwt from 'jsonwebtoken';
import enviarEmail from '../../services/enviarEmail';
import { NextApiRequest , NextApiResponse } from 'next';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { UsuarioModel } from '../../models/UsuarioModel';
import { politicaCORS } from '../../middlewares/CORS';

const endpointEsqueciASenha = async (req:NextApiRequest, res:NextApiResponse) => {
            if(req.method === 'POST' ) {

                const { JWT_SECRET } = process.env


                    const  email = req.body.email
                    const emailExistente = await UsuarioModel.find({email:email})
                    
                    if(!emailExistente || emailExistente.length < 1 ) {
                        return res.status(400).json("Email Nao Existente")
                    }

                        const usuario = emailExistente[0];
                        

                        if(usuario.usuarioDoGoogle === true) {
                                return res.status(200).json("Parece que este email está cadastrado com o Google, faça login com a sua conta em vez das credenciais.")
                            }


                        const jwtsecret = JWT_SECRET + usuario.senha
                        const payload = {
                            email: usuario.email,
                            id: usuario._id

                        }

                        const token = jwt.sign(payload,jwtsecret, {expiresIn:'15m'})
                        const link = `http://localhost:3000/trocarASenha/${usuario.id}/${token}`

                        const emailPayload = {
                            to: usuario.email,
                            subject: 'Link para Redefinição de Senha',
                            text: `Aqui está seu link para redefinir a sua senha : ${link}`
                        }

                        enviarEmail(emailPayload)
                       
                        return res.status(200).json("Email com o Link para a Redefinição Enviado com Sucesso!")
                

                        


            }
}

export default politicaCORS(conectarBancoDeDados(endpointEsqueciASenha))