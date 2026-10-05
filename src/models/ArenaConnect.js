const prompt = require('prompt-sync')();
const Modalidade = require('./Modalidade');
const CadastroFactory = require('./CadastroFactory');
const Partida = require('./Partida');

class ArenaConnect {

    static #instancia = null;

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error(
                "ArenaConnect já existe. Use ArenaConnect.getInstancia()."
            );
        }

        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];
        this.partidas = [];

        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
        this.idEquipeContador = 1;
        this.idPartidaContador = 1;
    }

    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }

        return ArenaConnect.#instancia;
    }

    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(
            turma => turma.id === idTurma
        );

        if (!turma) {
            throw new Error(
                `Turma com ID ${idTurma} não existe.`
            );
        }

        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(
            atleta => atleta.id === idAtleta
        );

        if (!atleta) {
            throw new Error(
                `Atleta com ID ${idAtleta} não existe.`
            );
        }

        return atleta;
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(
            equipe => equipe.id === idEquipe
        );

        if (!equipe) {
            throw new Error(
                `Equipe com ID ${idEquipe} não existe.`
            );
        }

        return equipe;
    }

    adicionarTurma() {
        const nome = prompt("Nome da nova turma: ");

        try {
            const novaTurma = CadastroFactory.criarTurma(
                this.idTurmaContador,
                nome
            );

            this.turmas.push(novaTurma);
            this.idTurmaContador++;

            console.log("Turma registrada com sucesso!");

        } catch (erro) {
            console.log(
                `Turma não registrada: ${erro.message}`
            );
        }
    }

    listarTurmas() {
        console.log("\n=== LISTA DE TURMAS ===");

        if (this.turmas.length === 0) {
            console.log("Nenhuma turma no sistema.");
            return;
        }

        this.turmas.forEach(
            turma => turma.exibir()
        );
    }

    adicionarAtleta(idTurma, nome) {
        const turma = this.buscarTurmaOuFalhar(idTurma);

        const novoAtleta = CadastroFactory.criarAtleta(
            this.idAtletaContador,
            nome,
            idTurma
        );

        this.idAtletaContador++;
        this.atletas.push(novoAtleta);

        return {
            atleta: novoAtleta,
            turma: turma
        };
    }

    listarAtletas() {

        return this.atletas.map(atleta => {

            const turma = this.turmas.find(
                turma => turma.id === atleta.idTurma
            );

            return {
                atleta: atleta,
                turma: turma
            };
        });
    }

    adicionarArbitro() {
        const nome = prompt("Nome do Árbitro: ");

        const numeroCredencial = parseInt(
            prompt("Número de Credencial: ")
        );

        const anosExperiencia = parseInt(
            prompt("Anos de Experiência: ")
        );

        try {
            const novoArbitro = CadastroFactory.criarArbitro(
                this.idArbitroContador,
                nome,
                numeroCredencial,
                anosExperiencia
            );

            this.idArbitroContador++;
            this.arbitros.push(novoArbitro);

            console.log(
                "Árbitro registrado com sucesso!"
            );

        } catch (erro) {
            console.log(
                `Árbitro não registrado: ${erro.message}`
            );
        }
    }

    listarArbitros() {
        console.log("\n=== LISTA DE ÁRBITROS ===");

        if (this.arbitros.length === 0) {
            console.log("Nenhum árbitro no sistema.");
            return;
        }

        this.arbitros.forEach(
            arbitro => arbitro.exibir()
        );
    }

    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(
            equipe =>
                equipe.idTurma === idTurma &&
                equipe.modalidade === modalidade
        );
    }

    adicionarEquipe() {

        this.listarTurmas();

        const idTurma = parseInt(
            prompt("ID da Turma: ")
        );

        try {

            const turma = this.buscarTurmaOuFalhar(idTurma);

            console.log("\nModalidades disponíveis:");

            Object.values(Modalidade).forEach(
                modalidade => console.log(`- ${modalidade}`)
            );

            const modalidade = prompt(
                "Modalidade: "
            );

            if (this.equipeJaExiste(idTurma, modalidade)) {

                throw new Error(
                    `A turma ${turma.nome} já tem uma equipe em "${modalidade}".`
                );
            }

            const novaEquipe = CadastroFactory.criarEquipe(
                this.idEquipeContador,
                idTurma,
                modalidade
            );

            this.idEquipeContador++;
            this.equipes.push(novaEquipe);

            console.log(
                `Equipe registrada: ${turma.nome} em "${modalidade}"!`
            );

        } catch (erro) {

            console.log(
                `Equipe não registrada: ${erro.message}`
            );
        }
    }

    listarEquipes() {

        console.log("\n=== LISTA DE EQUIPES ===");

        if (this.equipes.length === 0) {
            console.log("Nenhuma equipe no sistema.");
            return;
        }

        this.equipes.forEach(equipe => {

            const turma = this.turmas.find(
                turma => turma.id === equipe.idTurma
            );

            const nomesAtletas = equipe.atletas
                .map(idAtleta =>
                    this.atletas.find(
                        atleta => atleta.id === idAtleta
                    )
                )
                .filter(atleta => atleta)
                .map(atleta => atleta.nome);

            equipe.exibir(
                turma ? turma.nome : "TURMA NÃO ENCONTRADA",
                nomesAtletas
            );
        });
    }

    removerEquipe() {

        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe a remover: ")
        );

        try {

            const equipe = this.buscarEquipeOuFalhar(
                idEquipe
            );

            this.equipes = this.equipes.filter(
                equipeAtual => equipeAtual.id !== equipe.id
            );

            console.log(
                "Equipe removida. Os atletas continuam no sistema."
            );

        } catch (erro) {

            console.log(
                `Não foi possível remover: ${erro.message}`
            );
        }
    }

    vincularAtletaEquipe() {

        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe: ")
        );

        try {

            const equipe = this.buscarEquipeOuFalhar(
                idEquipe
            );

            this.listarAtletas();

            const idAtleta = parseInt(
                prompt("ID do Atleta: ")
            );

            const atleta = this.buscarAtletaOuFalhar(
                idAtleta
            );

            if (atleta.idTurma !== equipe.idTurma) {

                throw new Error(
                    `${atleta.nome} não pertence à turma dessa equipe.`
                );
            }

            if (!equipe.adicionarAtleta(idAtleta)) {

                throw new Error(
                    `${atleta.nome} já está nessa equipe.`
                );
            }

            console.log(
                `${atleta.nome} vinculado à equipe de "${equipe.modalidade}"!`
            );

        } catch (erro) {

            console.log(
                `Não foi possível vincular: ${erro.message}`
            );
        }
    }

    desvincularAtletaEquipe() {

        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe: ")
        );

        try {

            const equipe = this.buscarEquipeOuFalhar(
                idEquipe
            );

            const idAtleta = parseInt(
                prompt("ID do Atleta a remover da equipe: ")
            );

            const atleta = this.buscarAtletaOuFalhar(
                idAtleta
            );

            if (!equipe.removerAtleta(idAtleta)) {

                throw new Error(
                    `${atleta.nome} não está nessa equipe.`
                );
            }

            console.log(
                `${atleta.nome} removido da equipe.`
            );

        } catch (erro) {

            console.log(
                `Não foi possível desvincular: ${erro.message}`
            );
        }
    }

    registrarPartida() {

        const idA = parseInt(
            prompt("ID da Equipe A: ")
        );

        const idB = parseInt(
            prompt("ID da Equipe B: ")
        );

        const golsA = parseInt(
            prompt("Gols da Equipe A: ")
        );

        const golsB = parseInt(
            prompt("Gols da Equipe B: ")
        );

        try {

            this.buscarEquipeOuFalhar(idA);
            this.buscarEquipeOuFalhar(idB);

            const novaPartida = new Partida(
                this.idPartidaContador,
                idA,
                idB,
                golsA,
                golsB
            );

            this.partidas.push(novaPartida);
            this.idPartidaContador++;

            console.log(
                "Partida registrada com sucesso!"
            );

        } catch (erro) {

            console.log(
                `Partida não registrada: ${erro.message}`
            );
        }
    }

    listarPartidas() {

        console.log("\n=== LISTA DE PARTIDAS ===");

        if (this.partidas.length === 0) {
            console.log("Nenhuma partida no sistema.");
            return;
        }

        this.partidas.forEach(partida => {

            console.log(
                `Partida: ${partida.id} | Equipe A: ${partida.idA} | Equipe B: ${partida.idB} | Placar: ${partida.placar.golsA} x ${partida.placar.golsB}`
            );
        });
    }
}

module.exports = ArenaConnect;