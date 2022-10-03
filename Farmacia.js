let input = require('fs').readFileSync(__dirname+'/Farmacia.txt', 'utf8');

class Farmacia {
    constructor(data, nome, endereco, telefone, link = "https://tijucas.sc.gov.br/conteudo/paginas/78/setembro-22.pdf"){
        this.data = data;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.link = link;
    }
    imprimirDados(){
        return `\n Farmácia: ${this.nome} \n Telefone: ${this.telefone} \n Endereço: ${this.endereco}`;
    }
}

var listFarmacia = [];

function load(){
    let registrosDeFarmacia = input.split('\n');
    for(let i=0; i<registrosDeFarmacia.length; i++){
        let regUnico = registrosDeFarmacia[i].split(';');
        let farmacia = new Farmacia(regUnico[0], regUnico[1], regUnico[2], regUnico[3]);
        listFarmacia.push(farmacia);
    }
}

function pegarFarmaciaPlantao(mes, dia){
    let farmaciaPlantao = null;
    if (listFarmacia.length <=0){
        load();
    }
    for(let i=0; i<listFarmacia.length; i++){
        if(dia == listFarmacia[i].data.slice(0,2) && mes == listFarmacia[i].data.slice(3,5)){  //data é a escolhida
            farmaciaPlantao = listFarmacia[i];
            break;
        }
    }
    return farmaciaPlantao;
}

function pegarListaFarmacia(){
    if(listFarmacia.length<= 0){
        load();
    }
    return listFarmacia;
}

function imprimirListaFarmacia(listaFarmacia){
    for(let i = 0 ; i<listaFarmacia.length ; i++){
        let dados = listaFarmacia[i].imprimirDados(); 
        console.log(dados);      
    }
}

function imprimirFarmaciaPlantao(farmacia){
    if (farmacia == null){
        console.log("Não há farmacia de plantão");
    } else {
        console.log(` Para o dia: ${farmacia.data} está de plantão:\n Farmácia: ${farmacia.nome}\n Tel: ${farmacia.telefone}\n End: ${farmacia.endereco}\n`);
    }
}

module.exports = {
    pegarListaFarmacia,
    pegarFarmaciaPlantao,
    imprimirListaFarmacia,
    imprimirFarmaciaPlantao,
}
