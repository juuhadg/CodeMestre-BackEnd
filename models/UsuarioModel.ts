import mongoose, {Schema} from "mongoose";
const UsuarioSchema = new Schema({
    nome:{type: String, required : true},
    email: {type : String, required : true},
    senha: {type : String, required : true},
    avatar: {type : String, required : false},
    level: {type : Number, default: 1},
    NumeroDeproblemasResolvidos: {type : Number, default: 0},
    xp: {type: Number, default: 0},
    problemasResolvidos: {type: Array, default: [], required: true}


})

export const UsuarioModel =(mongoose.models.usuarios || mongoose.model('usuarios', UsuarioSchema)) ;