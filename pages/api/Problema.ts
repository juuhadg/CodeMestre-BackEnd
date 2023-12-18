import { NextApiRequest,NextApiResponse } from "next";
import { ProblemaModel } from "../../models/ProblemaModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";
import { politicaCORS } from "../../middlewares/CORS";

const problemaEnpoint = async (req:NextApiRequest, res: NextApiResponse) => {
    const { SEGREDO_DIARIA } = process.env
    if(req.headers.segredo != SEGREDO_DIARIA ) {
        return res.status(401).json('Nao Autorizado, Segredo Incorreto')
    }

        if(req.method === 'POST') {
            const problema = {
                nome: req.body.nome,
                descricao: req.body.descricao,
                exemplos : req.body.exemplos,
                respostaEsperada: req.body.respostaEsperada,
                testCases: req.body.testCases,
                nomeDaFuncao: req.body.nomeDaFuncao
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
                exemplos: req.body.exemplos,
                respostaEsperada: req.body.respostaEsperada,
                testCases: req.body.testCases,
                nomeDaFuncao: req.body.nomeDaFuncao,
                isArray: req.body.isArray
            }
            try {
                await ProblemaModel.findOneAndUpdate({nome :req.body.nomeAntigo},novoProblema)
                return res.status(200).json("problema Atualizado com sucesso")

            } catch(e) {
                return res.status(500).json('Erro ao Atualizar o problema')
            }


        } 
        
        if(req.method === 'GET') {
            var problemas ;
            if(!req.query.id) {
                try {
                    problemas = await ProblemaModel.find();
                    if(!problemas || problemas.length < 1) {
                        return res.status(400).json("Problemas Não foram Encontrados")
                    }
                        return res.status(200).json(problemas)
                } catch(e) {
                        return res.status(500).json("Erro Interno " + e)
                    }
                   
            }
                    const {id} = req.query
            try {
                problemas = await ProblemaModel.findById(id);
                if(!problemas || problemas.length < 1) {
                    return res.status(400).json("Problema Nao Existe")
                }
                return res.status(200).json(problemas)

            } catch(e) {
                return res.status(500).json("Erro ao encontrar problema " + e)
            }

        }



}           

export default politicaCORS(conectarBancoDeDados(problemaEnpoint))


