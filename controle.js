const emergencia = require('../View/viewEmerg');
const farmacia = require ('../Model/Farmacia');
const fire = require ('../View/viewIcendio');
const ver = require('../View/mainView');
const comando = require('../funcionais');
const login = require('../Model/Verificador');
const userModel = require('../Model/userModel');
const Verificador = require('../Model/Verificador');
let string = require('prompt-sync')();

function start (){
    let online; 
    let pergunta;
    let exit;
    do{
        ver.saida()
        exit = ver.tx(1,2)
    if(exit == 2){
        comando.mostrar("Obrigado por utilizar nossos serviços. Volte sempre !")
    }else{
      online = login.verificarLogin_cadastro(string, ver.perguntaLogin(), ver.tx(1, 3));
      do{ 
        ver.menuInicial()
        pergunta = ver.tx(1, 4);                          
            switch(pergunta){
                case 1 : {
                    if(online){     
                        let resposta;
                        do{ 
                            ver.menuEmergencia()
                            resposta = ver.tx( 1, 5);         
                            if (resposta == 5){
                                ver.redirecionar();
                            }else{
                              switch(resposta){
                                case 1: {
                                    let dado; 
                                    do{ 
                                        fire.rpFire(); 
                                        fire.menuIncendio();                                             
                                        dado = ver.tx(1,4);
                                        if(dado == 4){
                                            ver.redirecionar();
                                        }else{                                                                 
                                        fire.dica(dado, string );
                                        }                                       
                                      }while(dado != 4);   
                                    }break;
                                case 2:{
                                    emergencia.roubo(string);
                                    }break;
                                case 3:{
                                    emergencia.victim();
                                    emergencia.modeloAcidente(ver.tx(1, 3),string);
                                    }break;                                                                             
                                case 4:{
                                    emergencia.victim();
                                    emergencia.sequestro(ver.tx(1 , 3), string);           
                                    }break;
                                } 
                            }
                        } while(resposta != 5); 
                    }else{
                        ver.offline();
                    }
                    }break;
                case 2:{
                    if(online){
                        let opcaoSUB;
                        do{
                          ver.imprimirMenuSubFarmacia();
                          opcaoSUB = ver.tx(1,3);
                          switch(opcaoSUB){
                            case 1:{   
                                let date = new Date();
                                let dia = date.getDate();
                                let mes = date.getMonth() + 1;
                                let farm = farmacia.pegarFarmaciaPlantao(mes, dia);
                                farmacia.imprimirFarmaciaPlantao(farm);
                                }break;
                            case 2:{
                                farmacia.imprimirListaFarmacia(farmacia.pegarListaFarmacia());
                                }break;    
                            }
                        }while(opcaoSUB!=3);                                 
                    }else{
                        ver.offline();
                    }
                    }break;
                case 3:{
                    if(online){
                        ver.trocaCadastro()
                        let g = ver.tx(1,7)
                        userModel.troca(string, g);
                    }else{
                        ver.offline();
                    }
                    }break;                                                          
                }
            }while(pergunta != 4);
        }
    }while(exit != 2);
}

function xerox (){
    //userModel.cop;
    userModel.manterArq();
}
module.exports = {
    start,
    xerox,
}