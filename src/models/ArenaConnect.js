const prompt = require('prompt-sync')();

const Modalidade = require('./Modalidade');
const CadastroFactory = require('./CadastroFactory');
const fs = require('fs');
const path = require('path');

const ARQUIVO_DADOS = path.join(__dirname, '..', '..', 'dados-arena-connect.json');

class ArenaConnect {
    static #instancia = null;

    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }
        return ArenaConnect.#instancia;
    }

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error('ArenaConnect já existe. Use ArenaConnect.getInstancia().');
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

    adicionarTurma() {
        const nome = prompt("Nome da nova turma: ");

        try {
            this.turmas.push(
                CadastroFactory.criarTurma(
                    this.idTurmaContador,
                    nome
                )
            );

            this.idTurmaContador++;
        } catch (erro) {
            console.log(`✖ Turma não registrada: ${erro.message}`);
        }
    }

    listarTurmas() {
        console.log("\n=== LISTA DE TURMAS ===");

        if (this.turmas.length === 0) {
            return console.log("Nenhuma turma no sistema.");
        }

        this.turmas.forEach(t => t.exibir());
    }

    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(
            t => t.id === idTurma
        );

        if (!turma) {
            throw new Error(`Turma com ID ${idTurma} não existe.`);
        }

        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(
            a => a.id === idAtleta
        );

        if (!atleta) {
            throw new Error(`Atleta com ID ${idAtleta} não existe.`);
        }

        return atleta;
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(
            e => e.id === idEquipe
        );

        if (!equipe) {
            throw new Error(`Equipe com ID ${idEquipe} não existe.`);
        }

        return equipe;
    }

    adicionarAtleta(idT, nome) {
        const turma = this.buscarTurmaOuFalhar(idT);

        const novoAtleta = CadastroFactory.criarAtleta(
            this.idAtletaContador,
            nome,
            idT
        );

        this.idAtletaContador++;
        this.atletas.push(novoAtleta);

        return {
            atleta: novoAtleta,
            turma
        };
    }

    listarAtletas() {
        return this.atletas.map(atleta => ({
            atleta,
            nomeTurma: this.turmas.find(
                t => t.id === atleta.idTurma
            )?.nome ?? 'Turma não encontrada'
        }));
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

            console.log("✔ Árbitro registrado com sucesso!");
        } catch (erro) {
            console.log(`✖ Árbitro não registrado: ${erro.message}`);
        }
    }

    listarArbitros() {
        console.log("\n=== LISTA DE ÁRBITROS ===");

        if (this.arbitros.length === 0) {
            return console.log("Nenhum árbitro no sistema.");
        }

        this.arbitros.forEach(a => a.exibir());
    }

    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(
            e =>
                e.idTurma === idTurma &&
                e.modalidade === modalidade
        );
    }

    adicionarEquipe() {
        this.listarTurmas();

        const idT = parseInt(
            prompt("ID da Turma: ")
        );

        try {
            const turma = this.buscarTurmaOuFalhar(idT);

            console.log("\nModalidades disponíveis:");

            Object.values(Modalidade).forEach(
                m => console.log(`- ${m}`)
            );

            const modalidade = prompt(
                "Modalidade (copie exatamente como está na lista acima): "
            );

            if (this.equipeJaExiste(idT, modalidade)) {
                throw new Error(
                    `a turma ${turma.nome} já tem uma equipe em "${modalidade}".`
                );
            }

            const novaEquipe = CadastroFactory.criarEquipe(
                this.idEquipeContador,
                idT,
                modalidade
            );

            this.idEquipeContador++;
            this.equipes.push(novaEquipe);

            console.log(
                `✔ Equipe registrada: ${turma.nome} em "${modalidade}"!`
            );
        } catch (erro) {
            console.log(
                `✖ Equipe não registrada: ${erro.message}`
            );
        }
    }

    listarEquipes() {
        console.log("\n=== LISTA DE EQUIPES ===");

        if (this.equipes.length === 0) {
            return console.log("Nenhuma equipe no sistema.");
        }

        this.equipes.forEach(e => {
            const turma = this.turmas.find(
                t => t.id === e.idTurma
            );

            const nomesAtletas = e.atletas
                .map(
                    idA => this.atletas.find(
                        a => a.id === idA
                    )
                )
                .filter(a => a)
                .map(a => a.nome);

            e.exibir(
                turma ? turma.nome : "TURMA NÃO ENCONTRADA",
                nomesAtletas
            );
        });
    }

    removerEquipe() {
        this.listarEquipes();

        const idE = parseInt(
            prompt("ID da Equipe a remover: ")
        );

        try {
            const equipe = this.buscarEquipeOuFalhar(idE);

            this.equipes = this.equipes.filter(
                e => e.id !== equipe.id
            );

            console.log(
                `✔ Equipe removida. Os atletas continuam no sistema (total de atletas: ${this.atletas.length}).`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível remover: ${erro.message}`
            );
        }
    }

    vincularAtletaEquipe() {
        this.listarEquipes();

        const idE = parseInt(
            prompt("ID da Equipe: ")
        );

        try {
            const equipe = this.buscarEquipeOuFalhar(idE);

            this.listarAtletas();

            const idA = parseInt(
                prompt("ID do Atleta: ")
            );

            const atleta = this.buscarAtletaOuFalhar(idA);

            if (atleta.idTurma !== equipe.idTurma) {
                throw new Error(
                    `${atleta.nome} não pertence à turma dessa equipe.`
                );
            }

            if (!equipe.adicionarAtleta(idA)) {
                throw new Error(
                    `${atleta.nome} já está nessa equipe.`
                );
            }

            console.log(
                `✔ ${atleta.nome} vinculado à equipe de "${equipe.modalidade}"!`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível vincular: ${erro.message}`
            );
        }
    }

    desvincularAtletaEquipe() {
        this.listarEquipes();

        const idE = parseInt(
            prompt("ID da Equipe: ")
        );

        try {
            const equipe = this.buscarEquipeOuFalhar(idE);

            const idA = parseInt(
                prompt("ID do Atleta a remover da equipe: ")
            );

            const atleta = this.buscarAtletaOuFalhar(idA);

            if (!equipe.removerAtleta(idA)) {
                throw new Error(
                    `${atleta.nome} não está nessa equipe.`
                );
            }

            console.log(
                `✔ ${atleta.nome} removido da equipe. Ele continua no sistema (total de atletas: ${this.atletas.length}).`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível desvincular: ${erro.message}`
            );
        }
    }

    registrarPartida(idEquipeA, idEquipeB, golsA, golsB) {
        const equipeA = this.buscarEquipeOuFalhar(idEquipeA);
        const equipeB = this.buscarEquipeOuFalhar(idEquipeB);

        if (equipeA.modalidade !== equipeB.modalidade) {
            throw new Error(
                "as equipes não jogam a mesma modalidade!"
            );
        }

        if (equipeA.id === equipeB.id) {
            throw new Error(
                "Uma equipe não pode jogar contra ela mesma!"
            );
        }

        const partida = CadastroFactory.criarPartida(
            this.idPartidaContador,
            idEquipeA,
            idEquipeB,
            equipeA.modalidade,
            golsA,
            golsB
        );

        this.idPartidaContador++;
        this.partidas.push(partida);

        return {
            partida,
            nomeEquipeA: this.#rotularEquipe(idEquipeA),
            nomeEquipeB: this.#rotularEquipe(idEquipeB)
        };
    }

    #rotularEquipe(idEquipe) {
        const equipe = this.equipes.find(
            e => e.id === idEquipe
        );

        if (!equipe) {
            return 'Equipe não encontrada';
        }

        const turma = this.turmas.find(
            t => t.id === equipe.idTurma
        );

        return `${turma ? turma.nome : '?'} (${equipe.modalidade})`;
    }

    listarPartidas() {
        return this.partidas.map(partida => ({
            partida,
            nomeEquipeA: this.#rotularEquipe(
                partida.idEquipeA
            ),
            nomeEquipeB: this.#rotularEquipe(
                partida.idEquipeB
            )
        }));
    }

    calcularClassificacao() {
        const tabelas = {};

        const modalidades = [
            ...new Set(
                this.equipes.map(
                    equipe => equipe.modalidade
                )
            )
        ];

        modalidades.forEach(modalidade => {
            const equipes = this.equipes.filter(
                equipe => equipe.modalidade === modalidade
            );

            const linhas = equipes.map(equipe => {
                const turma = this.turmas.find(
                    t => t.id === equipe.idTurma
                );

                return {
                    idEquipe: equipe.id,
                    equipe: `${turma ? turma.nome : '?'} (${equipe.modalidade})`,
                    pontos: 0,
                    jogos: 0,
                    vitorias: 0,
                    empates: 0,
                    derrotas: 0,
                    gp: 0,
                    gc: 0,
                    sg: 0
                };
            });

            const partidasDaModalidade =
                this.partidas.filter(
                    partida =>
                        partida.modalidade === modalidade
                );

            partidasDaModalidade.forEach(partida => {
                const linhaA = linhas.find(
                    linha =>
                        linha.idEquipe === partida.idEquipeA
                );

                const linhaB = linhas.find(
                    linha =>
                        linha.idEquipe === partida.idEquipeB
                );

                if (!linhaA || !linhaB) {
                    return;
                }

                linhaA.jogos++;
                linhaB.jogos++;

                linhaA.gp += partida.placar.golsA;
                linhaA.gc += partida.placar.golsB;

                linhaB.gp += partida.placar.golsB;
                linhaB.gc += partida.placar.golsA;

                const resultado = partida.vencedor();

                if (resultado === 'A') {
                    linhaA.pontos += 3;
                    linhaA.vitorias++;
                    linhaB.derrotas++;
                } else if (resultado === 'B') {
                    linhaB.pontos += 3;
                    linhaB.vitorias++;
                    linhaA.derrotas++;
                } else {
                    linhaA.pontos++;
                    linhaB.pontos++;
                    linhaA.empates++;
                    linhaB.empates++;
                }
            });

            linhas.forEach(linha => {
                linha.sg = linha.gp - linha.gc;
            });

            linhas.sort((a, b) => {
                if (b.pontos !== a.pontos) {
                    return b.pontos - a.pontos;
                }

                if (b.sg !== a.sg) {
                    return b.sg - a.sg;
                }

                if (b.gp !== a.gp) {
                    return b.gp - a.gp;
                }

                return a.equipe.localeCompare(b.equipe);
            });

            linhas.forEach((linha, indice) => {
                linha.pos = indice + 1;
            });

            tabelas[modalidade] = linhas;
        });

        return tabelas;
    }

    salvarEstado() {
        const dados = {
            turmas: this.turmas.map(t => ({
                id: t.id,
                nome: t.nome
            })),

            atletas: this.atletas.map(a => ({
                id: a.id,
                nome: a.nome,
                idTurma: a.idTurma
            })),

            arbitros: this.arbitros.map(a => ({
                id: a.id,
                nome: a.nome,
                numeroCredencial: a.numeroCredencial,
                anosExperiencia: a.anosExperiencia
            })),

            equipes: this.equipes.map(e => ({
                id: e.id,
                idTurma: e.idTurma,
                modalidade: e.modalidade,
                atletas: e.atletas
            })),

            partidas: this.partidas.map(p => ({
                id: p.id,
                idEquipeA: p.idEquipeA,
                idEquipeB: p.idEquipeB,
                modalidade: p.modalidade,
                golsA: p.placar.golsA,
                golsB: p.placar.golsB
            })),

            idTurmaContador: this.idTurmaContador,
            idAtletaContador: this.idAtletaContador,
            idArbitroContador: this.idArbitroContador,
            idEquipeContador: this.idEquipeContador,
            idPartidaContador: this.idPartidaContador
        };

        fs.writeFileSync(
            ARQUIVO_DADOS,
            JSON.stringify(dados, null, 2)
        );

        console.log(`✔ Estado salvo em ${ARQUIVO_DADOS}`);
    }

    carregarEstado() {
        if (!fs.existsSync(ARQUIVO_DADOS)) {
            console.log(
                'Nenhum estado salvo encontrado ainda — começando do zero.'
            );
            return;
        }

        const dados = JSON.parse(
            fs.readFileSync(
                ARQUIVO_DADOS,
                'utf-8'
            )
        );

        this.turmas = (dados.turmas || []).map(
            t => CadastroFactory.criarTurma(
                t.id,
                t.nome
            )
        );

        this.atletas = (dados.atletas || []).map(
            a => CadastroFactory.criarAtleta(
                a.id,
                a.nome,
                a.idTurma
            )
        );

        this.arbitros = (dados.arbitros || []).map(
            a => CadastroFactory.criarArbitro(
                a.id,
                a.nome,
                a.numeroCredencial,
                a.anosExperiencia
            )
        );

        this.equipes = (dados.equipes || []).map(e => {
            const equipe = CadastroFactory.criarEquipe(
                e.id,
                e.idTurma,
                e.modalidade
            );

            (e.atletas || []).forEach(
                idAtleta =>
                    equipe.adicionarAtleta(idAtleta)
            );

            return equipe;
        });

        this.partidas = (dados.partidas || []).map(
            p => CadastroFactory.criarPartida(
                p.id,
                p.idEquipeA,
                p.idEquipeB,
                p.modalidade,
                p.golsA,
                p.golsB
            )
        );

        this.idTurmaContador =
            dados.idTurmaContador || 1;

        this.idAtletaContador =
            dados.idAtletaContador || 1;

        this.idArbitroContador =
            dados.idArbitroContador || 1;

        this.idEquipeContador =
            dados.idEquipeContador || 1;

        this.idPartidaContador =
            dados.idPartidaContador || 1;

        console.log(
            `✔ Estado carregado: ${this.turmas.length} turma(s), ${this.atletas.length} atleta(s), ${this.equipes.length} equipe(s), ${this.partidas.length} partida(s).`
        );
    }
}

module.exports = ArenaConnect;