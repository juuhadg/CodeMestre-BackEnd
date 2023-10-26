import { NextApiRequest,NextApiResponse } from "next";
import { UsuarioModel } from "../../models/UsuarioModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";
import { politicaCORS } from "../../middlewares/CORS";

const rankingEnpoint = async (req:NextApiRequest, res: NextApiResponse) => {
   

        if(req.method === 'GET') {
        
           const usuarios = await UsuarioModel.find()
           if(!usuarios) {
            return res.status(400).json('usuarios nao encontrados')
           }
           const usuariosOrdenados = usuarios.sort(user => user.level)
           const ranking = usuariosOrdenados.map((user, index) => ({
            rank: index+1,
            avatar: user.avatar,
            nome: user.nome,
            nivel: user.level,
            problemasResolvidos: user.NumeroDeproblemasResolvidos,
        }));

           return res.status(200).json(ranking)

           
        }



}           

export default politicaCORS(conectarBancoDeDados(rankingEnpoint))