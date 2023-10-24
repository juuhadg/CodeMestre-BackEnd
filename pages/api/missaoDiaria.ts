import { NextApiRequest,NextApiResponse } from "next";
import { ProblemaModel } from "../../models/ProblemaModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";
import { politicaCORS } from "../../middlewares/CORS";

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
       const numeroAleatorio = randomInt(problemas.length)
       const problema = problemas[numeroAleatorio]
      
       return res.status(200).json("Missao Diaria Distribuida com Sucesso")

} 

     return res.status(400).json('Método Invalido')

}


export default politicaCORS(conectarBancoDeDados(missaoDiariaEndpoint))