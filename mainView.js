const c = require('../funcionais');

function menuInicial() {
    c.mostrar("  DIX TIJUCAS");
    c.mostrar(" 1 - Emergência");
    c.mostrar(" 2 - Farmácia");
    c.mostrar(" 3 - Perfil usuário")
    c.mostrar(" 4 - Encerrar/Login");
}

function menuEmergencia() {
    c.mostrar("   DIX TIJUCAS");
    c.mostrar("Qual sua emergência?");
    c.mostrar(" 1 - Incêndio");
    c.mostrar(" 2 - Roubo");
    c.mostrar(" 3 - Acidente");
    c.mostrar(" 4 - Sequestro");
    c.mostrar(" 5 - Suicídio (terceiros)");
    c.mostrar(" 6 - Menu Principal");
}

function redirecionar(){
    c.mostrar("--- Redirecionado ---");
}

function retorno(){
    c.mostrar("");
    c.mostrar(" 1 - Continuar");
    c.mostrar(" 2 - voltar");
}

function perguntaLogin(){
    c.mostrar("Como você deseja acessar o Portal?");
    c.mostrar(" 1 - Login");
    c.mostrar(" 2 - Cadastrar");
    c.mostrar(" 3 - Visitante");
}

function imprimirMenuSubFarmacia(){
    c.mostrar(" 1 - Plantao");
    c.mostrar(" 2 - Lista de Farmacia"); 
    c.mostrar(" 3 - Voltar"); 
}

function tx(num1, num2){
    let n = c.numero("Escolha uma opção ► ", num1, num2);
    c.mostrar("");
    return n;
}

function saida(){
    c.mostrar(" 1 - Acessar o site");
    c.mostrar(" 2 - Encerrar");
}

function trocaCadastro (){
    c.mostrar("\n  Mudar informações de cadastro.\n");
    c.mostrar(" 1 - Nome");
    c.mostrar(" 2 - Sobrenome");
    c.mostrar(" 3 - E-mail");
    c.mostrar(" 4 - Telefone");
    c.mostrar(" 5 - CEP");
    c.mostrar(" 6 - Senha");
    c.mostrar(" 7 - Voltar\n");
}

function offline (){
    c.mostrar("Esta opção não está disponível!");
    c.mostrar("Vá em 'Acessar o site' e selecione a opção [Login] ou [Cadastrar].\n");
}

module.exports = {
    menuInicial,
    perguntaLogin,
    imprimirMenuSubFarmacia,
    menuEmergencia,
    recuperacao,
    retorno,
    tx,
    saida,
    offline,
    trocaCadastro,
    redirecionar,
}