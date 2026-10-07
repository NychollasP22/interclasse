const { mostrarErroCadastro } = require('../views/AtletaViews');
const PartidaView = require('../views/PartidaViews')

const PartidaController = {
    registrarPartida(){
        sistema.listartEquipes();
        try{
            const idEquipeA = PartidaView.perguntarIdEquipe("Digite ID equipe A: ")
            const idEquipeB = PartidaView.perguntarIdEquipe("Digite ID equipe B: ")
            const golsA = PartidaView.perguntarGols("informe gols da Equipe A: ")
            const golsB = PartidaView.perguntarGols("informe gols da Equipe B: ")
            const { equipeA, equipeB } = sistema.registrarPartida(idEquipeA, idEquipeB, golsA, golsB);
            PartidaView.mostrarRegistrada(equipeA.modalidade, equipeB.modalidade, golsA, golsB)
             

        } catch (erro) {
            PartidaView.mostrarErroCadastro(erro.message);

        }
    },
    listar(sistema){
        PartidaView.listarPartidas(sistemaPardidas());
    }
    
}