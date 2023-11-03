import mongoose, {Schema} from "mongoose";
const UsuarioGoogleSchema = new Schema({
    googleId: {type:String,required:true},
    nome:{type: String, required : true},
    email: {type : String, required : true},
    avatar: {type : String, required : false},
    usuarioDoGoogle: {type: Boolean, required: false},
    xp: {type: Number, default: 0},
    level: {type : Number, default: 1},
    NumeroDeproblemasResolvidos: {type : Number, default: 0},
    problemasResolvidosPorLinguagem: {type:Object,default: {javascript : 0,python: 0,csharp:0}},
    problemasResolvidos: {type: Array, default: []},
    missaoDiaria: {type:Object,required:false}


})

export const UsuarioGoogleModel =(mongoose.models.usuarios || mongoose.model('usuarios', UsuarioGoogleSchema)) ;