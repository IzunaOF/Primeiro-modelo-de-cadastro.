const model = require('../Model/userModel');
const c = require('../funcionais');

module.exports = {
/**
 * 
 * @returns retorna um valor boolean após verificar.
 */
verificarLogin_cadastro: function (string, perguntaLogin, num){
    let ativo = false;  
    perguntaLogin;
    let pergunta = num;
    switch (pergunta){
        case 1:{
            ativo = model.fazerLogin(string);
            }break;
        case 2:{
            model.cadastroUser(string);
            }break;
        default:{c.mostrar("-> Você entrou como 'Visitante'!\n");}
        }
    if(ativo == true){
        c.mostrar(`\n-> Você está logado!\n`);
    }
return ativo;
}
}