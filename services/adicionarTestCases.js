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

        if(dados.linguagem === 'csharp') {
            dados.nomeDaFuncao = dados.nomeDaFuncao.charAt(0).toUpperCase() + dados.nomeDaFuncao.slice(1);

                var codigo =  `using System;

                namespace Problema
                {
                    class ProblemaMain
                    {
                        ${codigoConvertidoString}
                
                        static void Main()
                        {
                            Console.WriteLine(${dados.nomeDaFuncao}(${dados.testCases[0]}));
                            Console.WriteLine(${dados.nomeDaFuncao}(${dados.testCases[1]}));
                            Console.WriteLine(${dados.nomeDaFuncao}(${dados.testCases[2]}));

                        }
                    }
                }
                `
               


                
        }
            else {

                codigo = 
               
                   `
       ${comando}(${dados.nomeDaFuncao + `(${dados.testCases[0]})`}); ${comando}(${dados.nomeDaFuncao + `(${dados.testCases[1]})`});  ${comando}(${dados.nomeDaFuncao + `(${dados.testCases[2]})`});
                   `
                   codigo = codigoConvertidoString + codigo
            }
           
       

            const codigoBuffer = Buffer.from(codigo, 'utf-8');
            const codigoConvertidoBase64 = codigoBuffer.toString('base64');
        

         const codigoFinal = codigoConvertidoBase64
         
        
        return codigoFinal;


}
