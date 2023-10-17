import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import  jwt, { JwtPayload }  from "jsonwebtoken";

export const validarToken = (handler : NextApiHandler) => 
 (req : NextApiRequest, res: NextApiResponse) => {

try{
    const {JWT_KEY} = process.env;
if (!JWT_KEY){
    return res.status(500).json('ENV chave JWT nao informado na execucao do projeto')
}
if(!req || !req.headers) {
    return res.status(401).json('Nao foi possivel validar o Token de acesso')
}

if(req.method !=='OPTIONS'){
    const authorization = req.headers['authorization'];

    if(!authorization){
        return res.status(401).json('Nao foi possivel validar o token de acesso')
    }
const token = authorization.substring(7);
if(!token){
    return res.status(401).json('Nao foi possivel validar o token de acesso')
}

const decoded =  jwt.verify(token, JWT_KEY) as JwtPayload;
if(!decoded){
    return res.status(401).json('Nao foi possivel validar o token de acesso')
}

if(!req.query){
    req.query = {};
} 
req.query.userId = decoded._id;

}

} catch(e) {
    console.log(e);
    return res.status(401).json({erro : 'Nao foi possivel validar o token de acesso'})
}


return handler(req, res);

}