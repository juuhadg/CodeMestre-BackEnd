import type { NextApiRequest, NextApiResponse } from 'next';
import uploadCodigoJudge0 from '../../services/uploadCodigoJudge0'
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { UsuarioModel } from '../../models/UsuarioModel';
import { validarToken } from '../../middlewares/validarToken';
import { politicaCORS } from '../../middlewares/CORS';





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

    const resposta = await uploadCodigoJudge0(req);

    if (!resposta) {
      return res.status(500).json("Erro ao Executar o código Internamente")
    }

   


    if (resposta.status.description === "Accepted") {

      if (resposta.stdout != null) {

        const respostaBuffer = Buffer.from(resposta.stdout, 'base64');
        const respostaDecodificada = respostaBuffer.toString('utf-8');

        if (respostaDecodificada.trim() === usuario.missaoDiaria.respostaEsperada) {

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
                  usuario.problemasResolvidosPorLinguagem.csharp++
          }

        

          await UsuarioModel.findByIdAndUpdate({ _id: usuario._id }, usuario);
          
          return res.status(200).json("Resposta Correta, Problema Concluído com sucesso!")
        }
        else {
          return res.status(200).json(`Código sem Erros, mas Resposta errada, resposta esperada : ${req.body.respostaEsperada} , resposta recebida : ${respostaDecodificada.trim()}`)
        }
      }
    }
    else {
      return res.status(200).json("Resposta Incorreta, erro : " + resposta.status.description)
    }
    
  }

  return res.status(400).json("Método Informado Inválido")

}

export default politicaCORS(validarToken(conectarBancoDeDados(enviarMissaoDiaria))) ;


