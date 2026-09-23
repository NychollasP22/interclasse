const prompt = require('prompt-sync')();

const Equipe = require('./src/models/Equipe');
const Modalidade = require('./src/models/Modalidade');
const { Pessoa, Arbitro, Atleta } = require('./src/models/Pessoa');
const Turma = require('./src/models/Turma');
const CadastroFactory = require('./src/models/CadastroFactory');

class ArenaConnect {

    static #instancia = null;

    constructor() {

        if (ArenaConnect.#instancia) {

            throw new Error(
                "Erro: Use ArenaConnect.getInstancia() para obter a instância do sistema!"
            );

        }

        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];

        this.idTurma = 1;
        this.idAtleta = 1;
        this.idArbitro = 1;
        this.idEquipe = 1;

        ArenaConnect.#instancia = this;
    }

    static getInstancia() {

        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }

        return ArenaConnect.#instancia;
    }

    buscarTurmaOuFalhar(idTurma) {

        const turmaEncontrada = this.turmas.find(
            turma => turma.id === idTurma
        );

        if (!turmaEncontrada) {

            throw new Error(
                `Turma com ID ${idTurma} não existe.`
            );

        }

        return turmaEncontrada;
    }

    buscarEquipeOuFalhar(idEquipe) {

        const equipeEncontrada = this.equipes.find(
            equipe => equipe.id === idEquipe
        );

        if (!equipeEncontrada) {

            throw new Error(
                `Equipe com ID ${idEquipe} não encontrada.`
            );

        }

        return equipeEncontrada;
    }

    buscarAtletaOuFalhar(idAtleta) {

        const atletaEncontrado = this.atletas.find(
            atleta => atleta.id === idAtleta
        );

        if (!atletaEncontrado) {

            throw new Error(
                `Atleta com ID ${idAtleta} não encontrado.`
            );

        }

        return atletaEncontrado;
    }

    equipeJaExiste(idTurma, modalidade) {

        return this.equipes.some(
            equipe =>
                equipe.idTurma === idTurma &&
                equipe.modalidade === modalidade
        );
    }

    adicionarTurma() {

        const nomeTurma = prompt("Nome da turma: ");

        if (!nomeTurma) {
            return;
        }

        const novaTurma = new Turma(
            this.idTurma++,
            nomeTurma
        );

        this.turmas.push(novaTurma);

        console.log("Turma registrada!");
    }

    listarTurmas() {

        console.log("\n=== TURMAS ===");

        if (!this.turmas.length) {

            console.log("Nenhuma turma cadastrada.");
            return;

        }

        this.turmas.forEach(
            turma => turma.exibir()
        );
    }

    adicionarAtleta() {

        this.listarTurmas();

        try {

            const idTurma = parseInt(
                prompt("ID da turma: ")
            );

            this.buscarTurmaOuFalhar(idTurma);

            const nomeAtleta = prompt(
                "Nome do atleta: "
            );

            if (!nomeAtleta) {
                return;
            }

            const novoAtleta =
                CadastroFactory.criarAtleta(
                    this.idAtleta++,
                    nomeAtleta,
                    idTurma
                );

            this.atletas.push(novoAtleta);

            console.log("Atleta registrado!");

        } catch (erro) {

            console.log(
                `Erro no cadastro: ${erro.message}`
            );

        }
    }

    listarAtletas() {

        console.log("\n=== ATLETAS ===");

        if (!this.atletas.length) {

            console.log("Nenhum atleta cadastrado.");
            return;

        }

        this.atletas.forEach(atleta => {

            const turmaAtleta = this.turmas.find(
                turma => turma.id === atleta.idTurma
            );

            atleta.exibir(
                turmaAtleta
                    ? turmaAtleta.nome
                    : "NÃO ENCONTRADA"
            );

        });
    }

    adicionarArbitro() {

        const nomeArbitro = prompt(
            "Nome do árbitro: "
        );

        if (!nomeArbitro) {
            return;
        }

        const credencial = parseInt(
            prompt("Credencial: ")
        );

        const anosExperiencia = parseInt(
            prompt("Anos de experiência: ")
        );

        const novoArbitro = new Arbitro(
            this.idArbitro++,
            nomeArbitro,
            credencial,
            anosExperiencia
        );

        this.arbitros.push(novoArbitro);

        console.log("Árbitro registrado!");
    }

    listarArbitros() {

        console.log("\n=== ÁRBITROS ===");

        if (!this.arbitros.length) {

            console.log("Nenhum árbitro cadastrado.");
            return;

        }

        this.arbitros.forEach(
            arbitro => arbitro.exibir()
        );
    }

    adicionarEquipe() {

        this.listarTurmas();

        try {

            const idTurma = parseInt(
                prompt("ID da turma: ")
            );

            this.buscarTurmaOuFalhar(idTurma);

            console.log("\nModalidades:");

            Object.values(Modalidade).forEach(
                modalidade =>
                    console.log(`- ${modalidade}`)
            );

            const modalidadeEscolhida = prompt(
                "Modalidade: "
            );

            if (
                !Object.values(Modalidade)
                    .includes(modalidadeEscolhida)
            ) {

                console.log("Modalidade inválida!");
                return;

            }

            if (
                this.equipeJaExiste(
                    idTurma,
                    modalidadeEscolhida
                )
            ) {

                console.log(
                    "Essa equipe já existe!"
                );

                return;
            }

            const novaEquipe =
                CadastroFactory.criarEquipe(
                    this.idEquipe++,
                    idTurma,
                    modalidadeEscolhida
                );

            this.equipes.push(novaEquipe);

            console.log("Equipe registrada!");

        } catch (erro) {

            console.log(
                `Erro ao registrar equipe: ${erro.message}`
            );

        }
    }

    listarEquipes() {

        console.log("\n=== EQUIPES ===");

        if (!this.equipes.length) {

            console.log("Nenhuma equipe cadastrada.");
            return;

        }

        this.equipes.forEach(equipe => {

            const turmaDaEquipe = this.turmas.find(
                turma => turma.id === equipe.idTurma
            );

            equipe.exibir(
                turmaDaEquipe
                    ? turmaDaEquipe.nome
                    : "NÃO ENCONTRADA"
            );

        });
    }

    vincularAtletaEquipe() {

        try {

            this.listarEquipes();

            const idEquipe = parseInt(
                prompt("ID da equipe: ")
            );

            const equipe =
                this.buscarEquipeOuFalhar(
                    idEquipe
                );

            this.listarAtletas();

            const idAtleta = parseInt(
                prompt("ID do atleta: ")
            );

            const atleta =
                this.buscarAtletaOuFalhar(
                    idAtleta
                );

            if (
                atleta.idTurma !== equipe.idTurma
            ) {

                throw new Error(
                    "Atleta pertence a outra turma!"
                );

            }

            if (
                equipe.atletas.includes(
                    atleta.id
                )
            ) {

                throw new Error(
                    "Atleta já está na equipe!"
                );

            }

            equipe.atletas.push(
                atleta.id
            );

            console.log(
                "Atleta vinculado!"
            );

        } catch (erro) {

            console.log(
                `Erro ao vincular atleta: ${erro.message}`
            );

        }
    }

    desvincularAtletaEquipe() {

        this.listarEquipes();

        try {

            const idEquipe = parseInt(
                prompt("ID da equipe: ")
            );

            const equipe =
                this.buscarEquipeOuFalhar(
                    idEquipe
                );

            if (!equipe.atletas.length) {

                console.log(
                    "Nenhum atleta na equipe."
                );

                return;
            }

            console.log(
                "\nAtletas da equipe:"
            );

            equipe.atletas.forEach(
                idAtleta => {

                    const atletaEncontrado =
                        this.atletas.find(
                            atleta =>
                                atleta.id === idAtleta
                        );

                    if (atletaEncontrado) {

                        console.log(
                            `ID: ${atletaEncontrado.id} | ${atletaEncontrado.nome}`
                        );

                    }
                }
            );

            const idAtletaParaRemover =
                parseInt(
                    prompt("ID do atleta: ")
                );

            const indiceAtleta =
                equipe.atletas.indexOf(
                    idAtletaParaRemover
                );

            if (indiceAtleta === -1) {

                console.log(
                    "Atleta não está na equipe!"
                );

                return;
            }

            equipe.atletas.splice(
                indiceAtleta,
                1
            );

            console.log(
                "Atleta desvinculado!"
            );

        } catch (erro) {

            console.log(
                `Erro ao desvincular atleta: ${erro.message}`
            );

        }
    }

    removerEquipe() {

        this.listarEquipes();

        try {

            const idEquipe = parseInt(
                prompt("ID da equipe: ")
            );

            const equipe =
                this.buscarEquipeOuFalhar(
                    idEquipe
                );

            const indiceEquipe =
                this.equipes.findIndex(
                    equipeEncontrada =>
                        equipeEncontrada.id === equipe.id
                );

            this.equipes.splice(
                indiceEquipe,
                1
            );

            console.log(
                "Equipe removida!"
            );

        } catch (erro) {

            console.log(
                `Erro ao remover equipe: ${erro.message}`
            );

        }
    }
}

function main() {

    const sistema =
        ArenaConnect.getInstancia();

    while (true) {

        console.log(`
==============================
        ARENA-CONNECT
==============================

1. Registrar Turma
2. Listar Turmas
3. Registrar Atleta
4. Listar Atletas
5. Registrar Árbitro
6. Listar Árbitros
7. Registrar Equipe
8. Listar Equipes
9. Vincular Atleta à Equipe
10. Desvincular Atleta da Equipe
11. Remover Equipe
12. Sair

==============================
`);

        const opcao = prompt("Escolha: ");

        if (opcao === "1") {

            sistema.adicionarTurma();

        } else if (opcao === "2") {

            sistema.listarTurmas();

        } else if (opcao === "3") {

            sistema.adicionarAtleta();

        } else if (opcao === "4") {

            sistema.listarAtletas();

        } else if (opcao === "5") {

            sistema.adicionarArbitro();

        } else if (opcao === "6") {

            sistema.listarArbitros();

        } else if (opcao === "7") {

            sistema.adicionarEquipe();

        } else if (opcao === "8") {

            sistema.listarEquipes();

        } else if (opcao === "9") {

            sistema.vincularAtletaEquipe();

        } else if (opcao === "10") {

            sistema.desvincularAtletaEquipe();

        } else if (opcao === "11") {

            sistema.removerEquipe();

        } else if (opcao === "0") {

            break;

        } else {

            console.log(
                "Opção inválida!"
            );

        }
    }
}

if (require.main === module) {

    main();

}

module.exports = {
    Modalidade,
    Pessoa,
    Atleta,
    Arbitro,
    Turma,
    Equipe,
    ArenaConnect
};
