import mongoose, {Schema} from "mongoose";
const ProblemaSchema = new Schema({
    nome: {type : String, required : true},
    linguagem: {type : String, required: true},
    
   


})

export const ProblemaModel =(mongoose.models.problemas || mongoose.model('problemas', ProblemaSchema)) ;