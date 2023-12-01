import mongoose, {Schema} from "mongoose";
const ProblemaSchema = new Schema({
    nome: {type : String, required : true},
    descricao: {type : String, required: true},
    respostaEsperada : {type: Array , required:true},
    exemplos: {type : Array, default: []},
    testCases: {type:Array, default:[]},
    nomeDaFuncao: {type: String , required : true}
    
})

export const ProblemaModel = (mongoose.models.problemas || mongoose.model('problemas', ProblemaSchema)) ;