import { NextApiRequest,NextApiResponse } from "next";
import { ProblemaModel } from "../../models/ProblemaModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";

const problemaEnpoint = async (req:NextApiRequest, res: NextApiResponse) => {
        if(req.method === 'POST') {
            const problema = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                respostaEsperada: req.body.respostaEsperada
            }
            
            const problemaJaExiste = await ProblemaModel.find({nome:problema.nome})
            console.log(problemaJaExiste)
            if(problemaJaExiste.length > 0) {
                return res.status(400).json('Problema Ja Existente no Banco')
            }

                await ProblemaModel.create(problema)
                return res.status(200).json('Problema salvo com Sucesso!')

           
        }

        if(req.method === 'PUT') {
            const novoProblema = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                respostaEsperada: req.body.respostaEsperada
            }
            await ProblemaModel.findOneAndUpdate({nome :req.body.nomeAntigo},novoProblema)
            return res.status(200).json("problema Atualizado com sucesso")
        }           



}           

export default conectarBancoDeDados(problemaEnpoint)