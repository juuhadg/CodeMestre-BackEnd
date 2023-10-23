import multer from "multer" ;
import {v2 as cloudinary} from 'cloudinary';

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

let streamifier = require('streamifier');



const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const uploadImagemCloudinary = async(req) => {
    
    if(req?.file?.originalname){

if(!req.file.originalname.includes('.png') &&
!req.file.originalname.includes('.jpg') &&
!req.file.originalname.includes('.jpeg')){
    throw new Error('Extensao da imagem invalida');
}



const streamUpload = (options, fileBuffer) => {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(options, function (
        error,
        result
      ) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
  
      streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    });
  };

    
    var options = {
        folder: 'CodeMestre/Avatares',
        public_id: req?.file.name,
    }
 
    var resultado = await streamUpload(options,req.file.buffer)
    

    return resultado;

        


    }
}

export const config = {
    api : {
        bodyParser : false
    }
}

export {upload, uploadImagemCloudinary};