import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import NextCors from 'nextjs-cors';

export const politicaCORS =  (handler: NextApiHandler) =>
async(req : NextApiRequest, res : NextApiResponse) => {
try{
    await NextCors(req,res, {
        origin : '*',
        methods : ['GET','POST','PUT'],
        optionsSuccessStatus : 200,

    })
    return handler(req,res);
}


catch(e){
    console.log('Erro ao tratar a politica de CORS', e);
    res.status(500).json({erro:'ocorreu um erro ao tratar a politica de CORS'})
}
}