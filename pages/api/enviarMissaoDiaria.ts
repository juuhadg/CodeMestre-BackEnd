import type { NextApiRequest, NextApiResponse } from 'next';
import uploadCodigoJudge0 from '../../services/uploadCodigoJudge0'
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { UsuarioModel } from '../../models/UsuarioModel';
import { validarToken } from '../../middlewares/validarToken';
import { politicaCORS } from '../../middlewares/CORS';
import adicionarTestCases from '../../services/adicionarTestCases';
import  {convertFromBase64} from '../../services/convertFromBase64';
import {formatarNumero} from '../../services/removerZerosInuteis';




const enviarMissaoDiaria = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {


    const { userId } = req.query
    const usuario  = await UsuarioModel.findById(userId);

    if (!usuario) {
      return res.status(400).json("Usuario Nao Encontrado")
    }

    if(!usuario.missaoDiaria) {
        return res.status(400).json("Você Já Concluiu a Missao Diaria de Hoje, Volte Amanhã!")
    }

      

      const dados = {
        codigo: req.body.codigo,
        linguagem: req.body.linguagemUsada,
        testCases: usuario.missaoDiaria.testCases,
        nomeDaFuncao: usuario.missaoDiaria.nomeDaFuncao,
        isArray: usuario.missaoDiaria.isArray
      }
        const codigoComTestCases = adicionarTestCases(dados)
      console.log(codigoComTestCases);
       
      req.body.codigo = codigoComTestCases
    
    

    const resposta = await uploadCodigoJudge0(req);

    if (!resposta) {
      return res.status(500).json({status : 'erro' , resposta : "Erro ao Executar o código Internamente, código incorreto!"})
    }

  


    if (resposta.status.description === "Accepted") { 

      if (resposta.stdout != null) {

        const respostaBuffer = Buffer.from(resposta.stdout, 'base64');
        const respostaDecodificada = respostaBuffer.toString('utf-8').trim().replace(/\n/g, ',');
          const respostaFormatada = formatarNumero(respostaDecodificada)
        if (respostaFormatada === usuario.missaoDiaria.respostaEsperada.toString()) {
            
          usuario.xp += 350;

          if (usuario.xp >= 500) { // upar de nivel e resetar xp para 0
            usuario.xp -= 500;
            usuario.level += 1;
          }

          usuario.NumeroDeproblemasResolvidos += 1;
          usuario.streak +=1;

          const dataAtual = new Date();

          usuario.ultimaMissaoDiariaConcluida = dataAtual;
          usuario.missaoDiaria = null;
       

          switch (req.body.linguagemUsada) {
            case 'javascript':
              usuario.problemasResolvidosPorLinguagem.javascript++
              break;
              case 'python':
                usuario.problemasResolvidosPorLinguagem.python++
                break;
                case 'csharp':
                  usuario.problemasResolvidosPorLinguagem.csharp++;
                  break;
                default:
                  break;
          }

        

          await UsuarioModel.findByIdAndUpdate({ _id: usuario._id }, usuario);
          
          return res.status(200).json({status : 'sucesso', resposta: "Resposta Correta, Problema Concluído com sucesso!"})
        }
        else {
          return res.status(200).json({status: 'erro', resposta:`Código sem Erros, mas Resposta errada, resposta esperada : ${usuario.missaoDiaria.respostaEsperada.toString()} , resposta recebida : ${respostaFormatada}`})
        }
      }
    }
    else {
        var codigoDeErro = ''
        if(resposta.compile_output != null) {
             codigoDeErro = convertFromBase64(resposta.compile_output).replace(/\n/g, "")
        }

      return res.status(200).json( { status: 'erro', resposta:"Resposta Incorreta, erro : " + resposta.status.description +" : "  + codigoDeErro })
    }
    
  }

  return res.status(400).json("Método Informado Inválido")

}

export default politicaCORS(validarToken(conectarBancoDeDados(enviarMissaoDiaria))) ;




