export default function adicionarTestCases(dados) {
        var comando;
    switch(dados.linguagem) {
        case 'javascript':
            comando = 'console.log';
            break;
        case 'csharp':
            comando = 'Console.WriteLine';
            break;
        case 'python': 
            comando = 'print';
            break;
        default:
            break;
    }
    
    const codigo2Buffer = Buffer.from(dados.codigo, 'base64');
    const codigoConvertidoString = codigo2Buffer.toString('utf-8');

        let codigo = 
        
            `${comando}(${dados.nomeDaFuncao + `(${dados.testCases[0]})`}); ${comando}(${dados.nomeDaFuncao + `(${dados.testCases[1]})`});  ${comando}(${dados.nomeDaFuncao + `(${dados.testCases[2]})`});`
           
       
            codigo = codigoConvertidoString + codigo

            const codigoBuffer = Buffer.from(codigo, 'utf-8');
            const codigoConvertidoBase64 = codigoBuffer.toString('base64');
        

         const codigoFinal = codigoConvertidoBase64
         
        
        return codigoFinal;


}
