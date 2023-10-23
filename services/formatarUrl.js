 export default function formatarUrl(string) {
    var urlFormatada = string.replace(/%20/g, ' ')
    var urlFormatada2 = urlFormatada.slice(0,-4)
   var urlFormatada3 = urlFormatada2.split('Avatares/');
   

   return urlFormatada3[1]
   
} 


