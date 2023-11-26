import { NextApiRequest,NextApiResponse } from "next";
import { ProblemaModel } from "../../models/ProblemaModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";
import { politicaCORS } from "../../middlewares/CORS";
import { UsuarioModel } from "../../models/UsuarioModel";

const missaoDiariaEndpoint = async (req:NextApiRequest, res: NextApiResponse) => {
        if(req.method === 'POST') {

          const { SEGREDO_DIARIA } = process.env

          if(req.headers.segredo != SEGREDO_DIARIA) {
               return res.status(401).json('Nao Autorizado, segredo incorreto')
          }

             const {
        randomInt
      } = await import('crypto');
              
       const problemas = await ProblemaModel.find()
       if(!problemas) {
          return res.status(400).json("Nenhum Problema Encontrado no Banco de Dados");
       }
          

  

       const usuarios = await UsuarioModel.find();
       if(!usuarios) {
          return res.status(400).json("Nao foi possivel encontrar os usuarios no Banco de Dados")
       }

          const dataAtual = new Date();

          for (const user of usuarios) {
               let numeroAleatorio = randomInt(problemas.length)
               let problema = problemas[numeroAleatorio]
               user.missaoDiaria = problema

               if((+dataAtual - +user.ultimaMissaoDiariaConcluida) > 24 * 60 * 60 * 1000) { // verificar se ja passou mais de 24 horas da ultima missão realizada
                    user.streak = 0;
               }
                    
          }


          const updates = usuarios.map(usuario => ({
               updateOne: {
                 filter: { _id: usuario._id }, 
                 update: { $set: { 
                    missaoDiaria: usuario.missaoDiaria,
                    streak: usuario.streak,
                    
               } }, 
               },
             }));
             
            
             await UsuarioModel.bulkWrite(updates);
   

          return res.status(200).json("Missao Diaria Distribuida com Sucesso")

} 

     return res.status(400).json('Método Invalido')

}


export default politicaCORS(conectarBancoDeDados(missaoDiariaEndpoint))