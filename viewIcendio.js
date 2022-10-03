const c = require('../funcionais');

function rpFire () {
    c.mostrar(" Corpo de Bombeiros [193]\n Quer algumas dicas de como proceder enquanto espera?");
}

function menuIncendio(){
    c.mostrar("");
    c.mostrar(" 1 - Florestal");
    c.mostrar(" 2 - Casa/Prédio");
    c.mostrar(" 3 - Automóvel");
    c.mostrar(" 4 - Voltar")
}

function dica(troca, string){
    switch (troca) {
        case 1:{
            c.mostrar(" * Primeiro evite um contato próximo ao fogo.");
            c.mostrar(" * Tente afastar a vegetação seca das margens, para não espalhar o incêndio.");
            c.mostrar(" * Se houver - Tire materiais inflamáveis do caminho.");
            c.mostrar(" * Fique atento ao vento e não deixe ninguém se aproximar ate a chegada dos BOMBEIROS!\n");
            } break;
        case 2:{
            c.mostrar(" 1 - Vítima");
            c.mostrar(" 2 - Terceiros");
            c.mostrar(" 3 - Voltar");
            let opcaoVit = parseInt(string("Escolha uma das opções ► "));
            c.mostrar("");
            switch(opcaoVit){
                case 1:{
                    c.mostrar(" * Abrigue-se em um cômodo seguro, se possível.");
                    c.mostrar(" * Abra as janelas, e isole a fenda da porta para não passar fumaça.");
                    c.mostrar(" * Vá até a janela e sinalize por AJUDA!\n");
                    }break;
                case 2:{
                    c.mostrar(" * Fique atento a pedidos de socorro das vítimas.");
                    c.mostrar(" * Não se aproxime da estrutura, é instável!");
                    c.mostrar(" * em caso grave, NÃO tente apagar o fogo.\n");
                    }break;
                }
            }break;
        case 3:{
            c.mostrar(" * NÃO tente conter produtos inflamáveis!");
            c.mostrar(" * Utilize extintores de incêncio para conter as chamas, atinja o foco do incêndio e não apenas as chamas.");
            c.mostrar(" * Se as chamas estiverem altas, se afaste para sua segurança.\n");
            }break;
    }
}

module.exports = {
    rpFire,
    menuIncendio,
    dica
}