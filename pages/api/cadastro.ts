import type { NextApiRequest, NextApiResponse } from 'next';
import type { CadastroType } from '../../types/cadastroType'; 
import { conectarBancoDeDados } from '../../middlewares/conectarBancoDeDados'; 
import md5 from 'md5';
import nc from 'next-connect';
import { upload , uploadImagemCloudinary} from '../../services/uploadImagemCloudinary';
import { UsuarioModel } from '../../models/UsuarioModel'; 

 
const handler = nc()
    .use(upload.single('file'))

    .post(async (req: NextApiRequest, res: NextApiResponse) => {


        const usuario = req.body as CadastroType;

        if (!usuario.nome || usuario.nome.length < 2) {
            return res.status(400).json({ erro: 'Nome Invalido' });

        }

        if (!usuario.email || usuario.email.length < 5 || !usuario.email.includes('@')
            || !usuario.email.includes('.')
        ) {
            return res.status(400).json({ erro: 'Email Invalido' })
        }
        if (!usuario.senha || usuario.senha.length < 7) {
            return res.status(400).json({ erro: 'Senha Invalida' })

        }

        //validacao se ja existe usuario com o mesmo email
        const usuariosComMesmoEmail = await UsuarioModel.find({ email: usuario.email });
        if (usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0) {
            return res.status(400).json({ erro: 'Ja Existe uma conta com o email informado' })
        }

        //enviar a imagem do multer para o cosmic    
        const image = await uploadImagemCloudinary(req)



        //salvar no banco de dados
        const usuarioASerSalvo = {
            nome: usuario.nome,
            email: usuario.email,
            senha: md5(usuario.senha),
            avatar: image?.url
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({ msg: 'Usuario criado com sucesso' })

    });

export const config = {
    api: {
        bodyParser: false
    }
}


export default (conectarBancoDeDados(handler));