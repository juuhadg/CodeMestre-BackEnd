import type  { NextApiRequest,NextApiHandler,NextApiResponse } from "next";
import mongoose from "mongoose";

export const conectarBancoDeDados = (handler : NextApiHandler) => async(req:NextApiRequest, res:NextApiResponse)=>{
        if(mongoose.connections[0].readyState) {
            return handler(req,res) ;
        }

        const {DB_CONNECTION_STRING} = process.env;

        if(!DB_CONNECTION_STRING) {
            return res.status(500).json(".env db_connection_string não informado corretamente")
        }

        mongoose.connection.on('connected', () => console.log('Banco de Dados Conectado')) ;
mongoose.connection.on('error', error => console.log(`Ocorreu erro ao conectar no banco: ${error}`))
await mongoose.connect(DB_CONNECTION_STRING);

return handler(req, res) ;

}
