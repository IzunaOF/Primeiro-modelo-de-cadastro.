const c = require("../funcionais");
const fs = require('fs');
const iUser = require('fs').readFileSync(__dirname+'/Usuario.txt', 'utf-8');
//const cop = require('fs').copyFileSync(__dirname+'/Usuario.txt', __dirname+'/API/backUp.txt');

class Usuario {
    constructor(nome, sobrenome, cpf, email, telefone, cep, pass){
        this.name = nome;
        this.nameSec = sobrenome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.pass = pass;
        }
    dadosImportantes(){
    return `\n Nome: ${this.name}, CPF: ${this.cpf}, Phone: ${this.telefone}, Ultima localização: ${this.local}. \n`
    }
    infoConsulta(){
        return `    ----
        Nome: ${this.name} Sobrenome: ${this.nameSec},
        E-mail: ${this.email},
        CEP: ${this.cep}.`
    }
}

let listaUsuario = [];
//let arqBackUp = [];

function loadUser (){
    let regUser = iUser.split('\n');
    for(let i=1; i<regUser.length; i++){
        let regUnico = regUser[i].split(';');
        let u = new Usuario(regUnico[0], regUnico[1], regUnico[2], regUnico[3], regUnico[4], regUnico[5], regUnico[6]);
        listaUsuario.push(u);
    }  
}

function mostrarUser (){
    if(listaUsuario.length <= 1){
        loadUser();
    }
    return listaUsuario;
}

function separar (item){
    fs.appendFileSync(__dirname+'/Usuario.txt',`\n${item.name};${item.nameSec};${item.cpf};${item.email};${item.telefone};${item.cep};${item.pass}`);
}

function manterArq (){
    mostrarUser();
    let reiniciar = iUser.split('\n');
    for (let i = 0; i < reiniciar.length; i++) {
        fs.writeFileSync(__dirname+'/Usuario.txt', '');
    }
    listaUsuario.forEach(separar(listaUsuario)); 
    /*let copy = arqBackUp;
    let up=[];
    for (let i = 0; i < copy.length; i++) {
        let download = copy[i].split(',');
        up.unshift(download);
        fs.writeFileSync(__dirname+'/Usuario.txt',`\n${up[0]}`);
    }*/
}

function troca(string, answer){
    if(answer == 7){
        c.mostrar("Nenhuma opção escolhida.");
    }
    else{
        let ok = false;
        let match = false;
        let lista = mostrarUser();
        let userCount = 0;
        let cpf;
        do{
            cpf = string("CPF: ");
            for (let i = 1; i < lista.length; i++) {
                if( lista[i].cpf == cpf){
                    userCount = 4;
                    ok = true;
                }
            }
            userCount ++;
            if(!ok){
                c.mostrar("Inválido! Por favor verifique seus dados e tente novamente.");    
            };
            tentativas(userCount);    
        }while(userCount < 3);
        
        if(ok){
            let count = 0;
            do{
                let informar = string("Senha: ");
                match = validarSenha(informar);
                for (let i = 0; i< lista.length; i++) {
                    if(lista[i].cpf == cpf && lista[i].pass == informar){
                        count = 4;
                        answer;
                        switch(answer){
                        case 1:{
                            let troca = string("Novo nome: ")
                            lista[i].name = troca;
                            }break;
                        case 2:{
                            let secName = string("Novo sobrenome: ")
                            lista[i].nameSec = secName;
                            }break;
                        case 3:{
                            let trocaEmail = string("Novo e-mail: ");
                            lista[i].email = trocaEmail;
                            }break;
                        case 4:{
                            let trocaPhone = string("Novo telefone: ");
                            lista[i].telefone = trocaPhone;
                            }break;
                        case 5:{
                            let trocaCep = string("Novo CEP: ");
                            lista[i].cep = trocaCep;
                            }break;
                        case 6:{
                            c.mostrar(" Atualizar senha ");
                            let trocaSenha = gerarSenha(string);
                            lista[i].pass = trocaSenha;
                            }break;
                        }
                    }
                } 
                count ++;
                if(!match){
                    c.mostrar("Senha inválida!");
                    }
                tentativas(count);
            }while(count < 3);
        if(match == false){
            c.mostrar("Algumas informações são inválidas.");
            }
        }
    } 
}

function cadastroUser(string) {
    let nome;
    let sobrenome;
    let nomeOK = false;
    let cpf;
    let cpfOK;
    let double;
    let email;
    let emailOK;
    let telefone;
    let telOK;
    let cep;
    let cepOK;
    let count = 0;
    do{ 
        msgPreencher("cadastro");
        nome = string("Nome: ");
        sobrenome = string("Sobrenome: ");
        count++;
        if(nome === sobrenome){
            c.mostrar("[ Campos inválidos! são idênticos ]")
        }else{
            nomeOK = validarNomes(nome, sobrenome);
            if(nomeOK == false){
            tentativas(count);
            }
        }
            
    }while(nomeOK == false && count < 3);
    count = 0;
    if(nomeOK == true){
        do{
            cpf = string("CPF: ");
            cpfOK = validarCPF(cpf);
            double = duploCPF(cpf);
            count++;
            if (cpfOK == false || double == true){
                c.mostrar("[ CPF Inválido! ]");
                tentativas(count);
            }else{
                c.mostrar(`-> Este número foi adicionado ${testeFormaCPF(cpf)}.`);
            }
        }while(count < 3 && (double == true || cpfOK == false));
        count = 0;
        if(double == false && cpfOK == true){
            do{
                email = string("E-mail: ");
                emailOK = validarEmail(email);
                count++;
                tentativas(count);
            }while(emailOK == false && count < 3);
            count = 0;
            if(emailOK == true){
                do{
                    c.mostrar("[ Formato válido '(xx)xxxxx-xxxx' ]");
                    telefone = string("Telefone: ");
                    telOK = validarTelefone(telefone);
                    count++;
                    tentativas(count);
                }while(telOK == false && count < 3);
                count = 0;
                if(telOK == true){
                    do{
                        c.mostrar("[ Formato válido 'xxxxx-xxx' ]");
                        cep = string("CEP: ");
                        cepOK = validarCEP(cep);
                        count++;
                        tentativas(count);
                    }while(cepOK == false && count < 3);
                    if(cepOK == true){
                        pass = gerarSenha(string);
                    }
                 }
            }
        }
    }
    if( (nomeOK && cpfOK && telOK && cepOK && emailOK) == true){  
        //fs.appendFileSync(__dirname+'/Usuario.txt',`\n${nome};${sobrenome};${cpf};${email};${telefone};${cep};${pass}`);
        listaUsuario.push(new Usuario(nome, sobrenome, cpf, email, telefone, cep, pass));
    }else{
        c.mostrar("-> Algumas informações são inválidas! Cadastro interrompido.\n");
    }  
}
 
function gerarSenha (string){
    let password;
    let password2;
    let validou = false;
    let s = 0;
        do{     
          password = string("Senha: ");
          let check = validarSenha(password);
          if(check == true){
            password2 = string("Repita a senha: ");
            validou = validarSenha(password2); 
            
            if(password2 === password){ 
                c.mostrar("\n[ Cadastrado com sucesso! ]\n");
                validou = true;
                return password2;
            }else{
                c.mostrar("[ Senhas são diferentes! ]");
                validou = false;
                s++;
            }
        }
        s++;  
        }while(validou == false && s < 3);
}

function fazerLogin(string){
    let usuarioOK = false;
    let lista = mostrarUser();
    let count = 0;
    let usuario;
    let match = false;
    let valido = false;
    do{
        msgPreencher("login");
        usuario = string("Nome: ");
        for (let i = 0; i < lista.length; i++) {
            if( lista[i].name == usuario){
                count = 4;
                usuarioOK = true;
            }
        }
        count ++;
        if(!usuarioOK && count < 3){
            c.mostrar("[ Usuário inválido! Por favor, tente novamente ]"); 
            
        };
        tentativas(count);
    }while(count < 3);
    count = 0;
    if(usuarioOK){
        let informar;  
        do{
            informar = string("CPF: ");
            for (let i = 0; i< lista.length; i++) {
            if(lista[i].cpf == informar && lista[i].name == usuario){
                match = validarCPF(informar);
                count = 4;
                }
            }
            count ++;
            if(!match){
                c.mostrar("[ CPF inválido! ]");   
            }
            tentativas(count);
        }while(count < 3)

        if(match == false){
            c.mostrar("-> Você exedeu o número de tentativas! tente novamente mais tarde.");    
        }
        count = 0;
        let senha;
        do{
            senha = string("Senha: ");
            for (let i = 0; i < lista.length; i++) {
                 if(lista[i].pass == senha && lista[i].name == usuario && lista[i].cpf == informar){
                    count = 4;
                    valido = true;
                }
            }
            count ++; 
            if(valido == false){
                c.mostrar("[ Senha inválida! Tente novamente ]");    
            }
            tentativas(count)
            }while(count < 3);

            if(!valido){
                c.mostrar("-> Algumas informações são inválidas, incapaz de fazer login!");
            } 
    }
    return valido;
}

function testeFormaCPF(c){
    let form;
    let array = [];
    array.push(c);
    for (let i = 0; i < array.length; i++) {
         let ok = array[i];
         form = (`${ok.slice(0,3)}.${ok.slice(3,6)}.${ok.slice(6,9)}-${ok.slice(9,12)}`);
    }
    return form;
    }

function validarTelefone (tel) {
    let formPhone = new RegExp('^\\([0-9]{2}\\)([0-9]{5}-[0-9]{4})$');
    let bool = formPhone.test(tel);
    if(bool == false){
        c.mostrar("[ Formato inválido! ]");
    }
    return bool;
}

function validarCEP(cep){
    let formCEP = new RegExp('^[0-9]{5}-[0-9]{3}$');
    let bool = formCEP.test(cep);
    if(bool == false){
        c.mostrar("[ Formato inválido! ]");
    }
    return bool;
}

function validarEmail(email){
    let regex = /\S+@\S+\.\S+/;
    let valido = regex.test(email);
    if(email.length > 30 || valido == false){
        c.mostrar("[ Fortação ou tamanho do e-mail inválidos! ]");
    }
  return valido;
}

function validarNomes (nome, sobrenome){

    let letrasPlus = /[A-Z]/;
    let letrasMin = /[a-z]/;

    let auxPlus1 = 0;
    let auxMin1 = 0;
    let auxPlus2 = 0;
    let auxMin2 = 0;

    let nBool = false;
    let secNBool = false;

    for (let i = 0; i < nome.length; i++) {
        if(letrasMin.test(nome[i])) {
            auxMin1++;
        }
        if(letrasPlus.test(nome[i])){
            auxPlus1 ++;
        }
    }  
    if(nome.length < 4 || nome.length > 15){
    }else if(auxMin1 > 0 && auxPlus1 > 0){
        nBool = !nBool;
    } 
    for (let j = 0; j < sobrenome.length; j++) {
        if(letrasMin.test(sobrenome[j])) {
            auxMin2++;
        }
        if(letrasPlus.test(sobrenome[j])){
            auxPlus2 ++;
        }
    }
    if(sobrenome.length < 4 || sobrenome.length > 15){
    }else if(auxMin2 > 0 && auxPlus2 > 0){
        secNBool = !secNBool;
    }
    if((nBool && secNBool) == true){
        return true;
    }
    if((secNBool || nBool ) == false){
        c.mostrar("[ Por favor escreva a informação corretamente! ]");
    }
    return false;
}

function validarSenha(senha){

    let letrasPlus = /[A-Z]/;
    let letrasMin = /[a-z]/;
    let numeros = /[0-9]/;
    let caracters = /[@|#|$|%|*]/;

    let auxPlus = 0;
    let auxMin = 0;
    let auxNum = 0;
    let auxCaracter = 0;

    for (let i = 0; i < senha.length; i++) {
        if(letrasMin.test(senha[i])){
            auxMin ++;
        }
        if(letrasPlus.test(senha[i])){
            auxPlus ++;
        }
        if(numeros.test(senha[i])){
            auxNum ++;
        }
        if(caracters.test(senha[i])){
            auxCaracter ++;
        }
    }
    if(senha.length < 8 || senha.length > 16){
        c.mostrar("-> Digite uma senha que contenha entre [8] e [16] caracters e ao menos [1] letra Maíscula, [1] Minúscula e [1] caracter especial.")
        return false;
    }
    if(auxMin > 0 && auxPlus > 0 && auxNum > 0 && auxCaracter > 0 ){
        return true;
    }
}

function validarCPF(cpf) {	
	cpf = cpf.replace('/[^\d]+/g,');	
	if(cpf == '') return false;		
	if (cpf.length != 11 || 
		cpf == "00000000000" || cpf == "11111111111" || 
		cpf == "22222222222" || cpf == "33333333333" || 
		cpf == "44444444444" || cpf == "55555555555" || 
		cpf == "66666666666" || cpf == "77777777777" || 
		cpf == "88888888888" || cpf == "99999999999")
	return false;		

	soma = 0;	
	for (i=0; i < 9; i ++)		
		soma += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (soma % 11);	
		if (rev == 10 || rev == 11)	
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;

	soma = 0;	
	for (i = 0; i < 10; i ++)		
		soma += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (soma % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;	
	return true;   
}

function duploCPF (cpf){
    mostrarUser();
    for (let i = 0; i < listaUsuario.length; i++) {
        if(listaUsuario[i].cpf === cpf){
            return true;
        }
    }
    return false;
}

function tentativas (num){
    switch(num){
        case 2:{
            c.mostrar("[ Você tem mais ' 1 ' tentativa! Verifique seus dados com atenção! ]");
            }break;
        case 3:{
            c.mostrar("-> Todas as tentativas foram esgotadas.");
        }break;
      }
}
function msgPreencher(modo){
    c.mostrar(` -- Preencha os campos abaixo para efetuar o '${modo}' -- `)
}

module.exports = {
Usuario,
listaUsuario,
mostrarUser,
cadastroUser,
fazerLogin,
validarEmail,
validarCPF,
senhaValidar: validarSenha,
validarCEP,
troca,
manterArq,
//cop,
}