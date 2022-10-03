let prompt = require('prompt-sync')();

module.exports = {

/**
 * 
 * @param  {...any} args espera receber um ou mais elementos e os retorna em forma de array;
 * para ser mostrado em tela.
 */
mostrar: function (... args){
    let frase="";
        for (let i = 0; i < args.length; i++) {
        frase += i < args.length-1 ? args[i]+" ":args[i];       
        }
    console.log(frase);
},

/**
 * A função espera receber um número como input, e retorna err quando não for.
 * @param {*} pergunta recebe um elemente entre ("") que deseja ser impresa em tela;
 * @param {*} minimo é o menor número a ser escolhido
 * @param {*} maximo é o maior número a ser escolhido
 * @returns retorna o valor escolhido ente {minimo} e {maximo} 
 */
numero: function  (pergunta, minimo, maximo){
    
    if (minimo>maximo){
        let temp = minimo;
        minimo = maximo;
        maximo = temp;
    };
    
        let num = 0;
        
        let ehNaN = true;
        let temLimite = minimo != maximo;
        let foraLimite = true;

    while(ehNaN || foraLimite){
        num = parseInt(prompt(pergunta));
        ehNaN = Number.isNaN(num);
        foraLimite = temLimite && (num < minimo || num > maximo) ? true : false;

            if(ehNaN){
                this.mostrar("   Erro na leitura. Por favor, digite um número!");
            }
            if(temLimite && foraLimite){
                this.mostrar("   Por favor, escolha uma das opções entre ",minimo," e ",maximo,"");
            }
    }  

    return num;
}

                                               
}
