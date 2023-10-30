import jwt from 'jsonwebtoken';
import { NextApiRequest , NextApiResponse } from 'next';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { UsuarioModel } from '../../models/UsuarioModel';
import { politicaCORS } from '../../middlewares/CORS';
import md5 from 'md5';

const endpointAlterarASenha = async (req:NextApiRequest, res:NextApiResponse) => {
    const { JWT_SECRET } = process.env
            if(req.method === 'GET' ) {
                        
                        const tokenquery = req?.query?.token
                        const id = req?.query?.id
                   
                    
                    var token = ''
                    if(typeof tokenquery === 'string') {
                        token = tokenquery
                    } else {
                        return res.status(400).json("token informado invalido")
                    }
                    
                  
                    const usuarioExiste = await UsuarioModel.find({_id : id})
                    if(!usuarioExiste || usuarioExiste.length < 1) {
                        return res.status(400).json("Usuario Nao Existente")
                    }
                    const usuario = usuarioExiste[0]
                  
                    const secret = JWT_SECRET + usuario.senha
                    try {
                        const payload = jwt.verify( token, secret)
                        return res.status(200).json({ msg: "Token e usuario Validos", valid : true})
                    } catch(error) {
                       
                        return res.status(404).json({ msg: "Token Invalido", valid: false})
                    }


                  
             }

            if(req.method === 'POST') {
                
                const tokenquery = req?.query?.token
                const id = req?.query?.id
                var token = ''
                if(typeof tokenquery === 'string') {
                    token = tokenquery
                } else {
                    return res.status(400).json("token informado invalido")
                }
              
                const usuarioExiste = await UsuarioModel.find({_id : id})
                if(!usuarioExiste || usuarioExiste.length < 1) {
                    return res.status(400).json("Usuario Nao Existente")
                }
                const usuario = usuarioExiste[0]
                const secret = JWT_SECRET + usuario.senha
                try {
                    const payload = jwt.verify( token, secret)
                    const novaSenha = req.body.senha
                    if(!novaSenha || novaSenha.length < 7) {
                        return res.status(400).json("Senha Invalida, necessário minímo 7 caracteres")
                    }
                    usuario.senha = md5(novaSenha)
                    await UsuarioModel.findByIdAndUpdate({ _id: usuario._id }, usuario);
                    return res.status(200).json("Senha alterada com sucesso!")
                } catch(error) {
                    
                    return res.status(404).json({ msg: "Token Invalido", valid: false})
                }



            }
}

export default politicaCORS(conectarBancoDeDados(endpointAlterarASenha))