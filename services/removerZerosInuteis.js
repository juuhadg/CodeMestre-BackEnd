
export function formatarNumero(numero) {
    var [numero1, numero2, numero3] = numero.split(',').map(item => item.trim());

        if(numero1.slice(-2) === '.0') numero1 = numero1.slice(0,-2)
        if(numero2.slice(-2) === '.0') numero2 = numero2.slice(0,-2)
        if(numero3.slice(-2) === '.0') numero3 = numero3.slice(0,-2)

        
        const novaString = `${numero1},${numero2},${numero3}`
        return novaString;
    }
    
