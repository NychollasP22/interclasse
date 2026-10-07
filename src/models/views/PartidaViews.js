const Partida = require('../Partida');
const { mostrarErroCadastro } = require('./AtletaViews');

const prompt = require('prompt-sync') ();

const PartidaView = {
    perguntarIdEquipe(mensagem){
        return parseInt(prompt(mensagem));
    },
    perguntarGols(mensagem){
        return parseInt(prompt(mensagem));
    },
    mostrarRegistrada(NomeA, golsA, NomeB, golsB){
        console.log(`[SUCESSO] Partida registrada: ${nomeA} ${golsA} x ${golsB}`)
    },
    mostrarErroCadastro(mensagem){
        console.log(` [ERRO] não foi possivel cadastraro atleta: ${messagem}`)
    },
    listarPartidas(lista){
        console.log("\n=== LISTA DE PARTIDAS ===");
        if (lista.lenght === 0) return console.log("nenhuma partida registrada!");
            lista.forEach(({ Partida, nomeEquipeA, nomeEquipeB }) => Partida.exibir(nomeEquipeA, nomeEquipeB)
        )}
    }


module.exports = PartidaView;