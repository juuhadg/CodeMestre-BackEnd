import { NextApiRequest,NextApiResponse } from "next";
import { UsuarioModel } from "../../models/UsuarioModel";
import { conectarBancoDeDados } from "../../middlewares/conectarBancoDeDados";
import { validarToken } from "../../middlewares/validarToken";
import {v2 as cloudinary} from 'cloudinary';
import formatarUrl from '../../services/formatarUrl'
import { upload, uploadImagemCloudinary } from '../../services/uploadImagemCloudinary';
import nc from 'next-connect'

    const {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
    } = process.env;

    cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key:  CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
    });

const handler = nc()
.use(upload.single('file'))
.put(async (req:any , res: NextApiResponse | any)=> {

    const { userId } = req?.query
    const usuario = await UsuarioModel.findById(userId)
    if(!usuario) {
        return res.status(400).json("usuario nao encontrado")
    }

        const { nome } = req.body
        
        if(nome && nome.length > 1 && usuario.nome != nome) {
            usuario.nome = nome
            
        }

            const { file } = req

            if(file) {
              
                

                if(usuario.avatar) {
                   
                    const urlADeletar = "CodeMestre/Avatares/" + formatarUrl(usuario.avatar)
                  
                   await cloudinary.uploader.destroy(urlADeletar);
        }

        const image = await uploadImagemCloudinary(req)
        usuario.avatar = image?.url 

            }

        
          
                    
                
        

        await UsuarioModel.findByIdAndUpdate({ _id: usuario._id }, usuario);
        return res.status(200).json("usuario Atualizado Com Sucesso")

        




})
.get(async(req:NextApiRequest, res: NextApiResponse)=> {
      
     
        const { userId } = req.query

       const usuario = await UsuarioModel.findById(userId)
       if(!usuario) {
        return res.status(404).json('Usuario Nao Encontrado')
       }
      
       return res.status(200).json(usuario)



   
       

    


})

export const config = {
    api: {
        bodyParser: false
    }
}

export default validarToken(conectarBancoDeDados(handler))