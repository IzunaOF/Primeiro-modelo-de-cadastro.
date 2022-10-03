const c = require ('../funcionais');

function victim (){
    c.mostrar(" 1 - Vítima");
    c.mostrar(" 2 - Terceiros");
    c.mostrar(" 3 - Voltar");
}

function modeloAcidente (resposta, text){
    switch(resposta){
        case 1:{
            c.mostrar("");
            c.mostrar("                ( 192 ) SAMU.");
            c.mostrar("-- Procure um lugar seguro e fique repousando!");
            c.mostrar("-- DIX TIJUCAX - Emergência automática (CLIQUE AQUI!).");
            c.mostrar("-- Seus dados serão enviados para o SAMU/PRF em tempo real.");
            c.mostrar("-- Se não estiver gravemente ferido, sinalize o local para evitar outro acidente.\n");
          }break;
        case 2:{
            c.mostrar("-- DIX TIJUCAX - Emergência automática (CLIQUE AQUI!).");
            c.mostrar("-- Seus dados serão enviados para o SAMU/PRF em tempo real.\n");
            c.mostrar("                ( 192 ) SAMU.");
            c.mostrar("Ex:. Rua, KM [rodovia], ponto de referência. ");
            let info = text("Qual o local do acidente ► ");
            c.mostrar("");
            c.mostrar(` -- Sua emergência em: ${info} foi enviada! --`);
            c.mostrar("");
            c.mostrar("-- Sinalize o local do acidente.");
            c.mostrar("-- preste os primeiros socorros a(s) vítima(s).");
            c.mostrar("-- Em caso de inexperiência com primeiros socorros, NÃO mexa na vítima, apenas chame a AMBULÂNCIA e aguarde no local!\n");
        }break;
    }
}

function exemplo (){
    c.mostrar("       >>   Exemplo    << ");
    c.mostrar("-- Tipo da estrada.");
    c.mostrar("-- Ponto de referência (Rodovias ou locais).");
    c.mostrar("-- Onde você foi sequestrado(a).");
    c.mostrar("-- Quantas horas se passaram (viajem).");
}

function sequestro(dado, string){
    let vitima;
      switch(dado){
        case 1:{
            c.mostrar("");
            c.mostrar("Consegue dizer algo sobre onde você está?");
            exemplo(); 
            c.mostrar("");
            vitima = string("Informações ► ");
            c.mostrar("");
            c.mostrar("--   DIX TIJUCAX em comunhão com DOPE    --");
            c.mostrar(`Você será acompanhado segundas estas informações: ${vitima} `);
            c.mostrar("Tambem foram eviados seus dados de usuario.");
            }break;
        case 2:{
            let denunciar = string("Denúncia ► ");
            c.mostrar("");
            c.mostrar(`Sua denúncia referente a ${denunciar } foi enviada para as autoridades competentes com os dados do usuário.`);
            }break;
        }
  return vitima;
}

function roubo(string){  
    c.mostrar("-- Polícia [190].");
    let text1 = string("Localidade da ocorrência ► ");
    let text2 = string("Características do individuo ou de um veículo ► ");
    let resposta = `${text2} no Local: ${text1}.`;
    c.mostrar(`Sua ocorrência referente ao roubo ocasionado por ${resposta} foi enviada para a central de emergência!`);
    c.mostrar("   *  Aguarde a viatura no local  * \n");
  return resposta;
}
    
module.exports = {
    sequestro,
    exemplo,
    roubo,
    modeloAcidente,
    victim,
}