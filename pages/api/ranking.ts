import { NextApiRequest,NextApiResponse } from "next";
import { UsuarioModel } from "../../models/UsuarioModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";
import { politicaCORS } from "../../middlewares/CORS";

const rankingEnpoint = async (req:NextApiRequest, res: NextApiResponse) => {
   

        if(req.method != 'GET') return res.status(400).json("Método De Request Inválido");
        
           const usuarios = await UsuarioModel.find().sort({level:-1, NumeroDeproblemasResolvidos: -1});

           if(!usuarios) return res.status(400).json('usuarios nao encontrados');
           
          
           const ranking = usuarios.map((user, index) => ({
              rank: index+1,
              avatar: user.avatar,
              nome: user.nome,
              nivel: user.level,
              problemasResolvidos: user.NumeroDeproblemasResolvidos,
            }));

           return res.status(200).json(ranking)

           
        



}           

export default politicaCORS(conectarBancoDeDados(rankingEnpoint))