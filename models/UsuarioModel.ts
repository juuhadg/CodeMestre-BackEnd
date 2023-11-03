import mongoose, {Schema} from "mongoose";
const UsuarioSchema = new Schema({
    nome:{type: String, required : true},
    email: {type : String, required : true},
    senha: {type : String, required : false},
    avatar: {type : String, required : false},
    xp: {type: Number, default: 0},
    level: {type : Number, default: 1},
    NumeroDeproblemasResolvidos: {type : Number, default: 0},
    problemasResolvidosPorLinguagem: {type:Object,default: {javascript : 0,python: 0,csharp:0}},
    problemasResolvidos: {type: Array, default: []},
    missaoDiaria: {type:Object,required:false}


})

export const UsuarioModel = (mongoose.models.usuarios || mongoose.model('usuarios', UsuarioSchema)) ;