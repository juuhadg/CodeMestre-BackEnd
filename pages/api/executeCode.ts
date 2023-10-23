import type { NextApiRequest, NextApiResponse } from 'next';
import uploadCodigoJudge0 from '../../services/uploadCodigoJudge0'
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados';
import { UsuarioModel } from '../../models/UsuarioModel';
import { validarToken } from '../../middlewares/validarToken';





const executeCode = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {


    const { userId } = req.query
    const usuario = await UsuarioModel.findById(userId);

    if (!usuario) {
      return res.status(400).json("Usuario Nao Encontrado")
    }

      if(usuario.problemasResolvidos.includes(req.body.problema)) {
        return res.status(200).json("Você Já Resolveu este problema antes !!")
      }

    const resposta = await uploadCodigoJudge0(req)

    if (!resposta) {
      return res.status(500).json("Erro ao Executar o código Internamente")
    }

   


    if (resposta.status.description === "Accepted") {

      if (resposta.stdout != null) {

        const respostaBuffer = Buffer.from(resposta.stdout, 'base64');
        const respostaDecodificada = respostaBuffer.toString('utf-8');

        if (respostaDecodificada.trim() === req.body.respostaEsperada) {

          usuario.xp += 200;
          usuario.NumeroDeproblemasResolvidos += 1;
          usuario.problemasResolvidos.push(req.body.problema)

          if (usuario.xp >= 500) {
            usuario.xp -= 500;
            usuario.level += 1;
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

export default validarToken(conectarBancoDeDados(executeCode));


