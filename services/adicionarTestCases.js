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
            let nomeFuncao = dados.nomeDaFuncao.charAt(0).toUpperCase() + dados.nomeDaFuncao.slice(1);
                console.log(nomeFuncao)
                var codigo =  `using System;

                namespace Problema
                {
                    class ProblemaMain
                    {
                        
                        ${codigoConvertidoString}
                
                        static void Main()
                        {
                            ${dados.isArray == false ? `
                            Console.WriteLine(${nomeFuncao}(${dados.testCases[0]}));
                            Console.WriteLine(${nomeFuncao}(${dados.testCases[1]}));
                            Console.WriteLine(${nomeFuncao}(${dados.testCases[2]}));
                            ` : `
                            Console.WriteLine(${nomeFuncao}(new int[] { ${dados.testCases[0] }));
                            Console.WriteLine(${nomeFuncao}(new int[] { ${dados.testCases[1] }));
                            Console.WriteLine(${nomeFuncao}(new int[] { ${dados.testCases[2] }));
                            `}
                        }
                    }
                }
                `
                
        }
            else {

                codigo = 
               
                   `
                   
                   ${dados.isArray == false ? `
${comando}(${dados.nomeDaFuncao + `(${dados.testCases[0]})`});
${comando}(${dados.nomeDaFuncao + `(${dados.testCases[1]})`}); 
${comando}(${dados.nomeDaFuncao + `(${dados.testCases[2]})`});
                   ` : `
${comando}(${dados.nomeDaFuncao + `([${dados.testCases[0]}])`});
${comando}(${dados.nomeDaFuncao + `([${dados.testCases[1]}])`}); 
${comando}(${dados.nomeDaFuncao + `([${dados.testCases[2]}])`});
                   `
                }
                   `
                   codigo = codigoConvertidoString + codigo
            }
           
       

            const codigoBuffer = Buffer.from(codigo, 'utf-8');
            const codigoConvertidoBase64 = codigoBuffer.toString('base64');
        

         const codigoFinal = codigoConvertidoBase64
         
        
        return codigoFinal;


}


    