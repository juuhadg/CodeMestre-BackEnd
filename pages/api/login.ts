import type { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import { UsuarioModel } from '../../models/UsuarioModel';
import jwt from 'jsonwebtoken';
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { politicaCORS } from '../../middlewares/CORS';

const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    const { JWT_KEY } = process.env;
    if (!JWT_KEY) {
        return res.status(500).json({ erro: 'ENV JWT Nao informada' })
    }


    if (req.method === 'POST') {
        const { email, senha } = req.body;

        const usuariosEncontrados = await UsuarioModel.find({ email: email, senha: md5(senha) })
        const usuarioEncontradoEmail = await UsuarioModel.findOne({ email: email })
        const usuarioEncontradoSenha = await UsuarioModel.findOne({ senha: md5(senha) })
        if (!usuarioEncontradoEmail) return res.status(400).json('Email Invalido')
        if (!usuarioEncontradoSenha) return res.status(400).json('Senha Invalida')


        if (usuariosEncontrados && usuariosEncontrados.length > 0) {
            const usuarioEncontrado = usuariosEncontrados[0];

            const token = jwt.sign({ _id: usuarioEncontrado._id }, JWT_KEY);

            return res.status(200).json({
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                token
            })
                ;
        }

        return res.status(400).json({ erro: 'Usuario ou Senha Incorreto' })
    }
    return res.status(405).json({ erro: 'Metodo Informado nao e valido' })
}

export default politicaCORS(conectarBancoDeDados(endpointLogin));