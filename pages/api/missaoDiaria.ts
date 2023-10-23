import { NextApiRequest,NextApiResponse } from "next";
import { ProblemaModel } from "../../models/ProblemaModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";

const missaoDiariaEndpoint = async (req:NextApiRequest, res: NextApiResponse) => {
        if(req.method === 'GET') {
             const {
        randomInt
      } = await import('crypto');
              
       const problemas = await ProblemaModel.find()
       const numeroAleatorio = randomInt(problemas.length)
       const problema = problemas[numeroAleatorio]
      
       return res.status(200).json(problema)

}  }

         

export default conectarBancoDeDados(missaoDiariaEndpoint)