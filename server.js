const prompt = require('prompt-sync')();

class Pessoa {
    #id;
    #nome;

    constructor(id, nome) {
        this.#id = id;
        this.nome = nome;
    }

    get id() {
        return this.#id;
    }

    set nome(novoNome) {
        if (!novoNome || novoNome.length < 3) {
            console.log("Nome inválido.");
            return;
        }

        this.#nome = novoNome;
    }

    get nome() {
        return this.#nome;
    }

    exibir() {
        console.log(`ID: ${this.#id} | Nome: ${this.#nome}`);
    }
}

class Turma {
    #nome;

    constructor(id, nome) {
        this.id = id;
        this.#nome = nome.toUpperCase();
    }

    set nome(novoNome) {
        if (!novoNome || novoNome.length < 3) {
            console.log("Nome inválido.");
            return;
        }

        this.#nome = novoNome.toUpperCase();
    }

    get nome() {
        return this.#nome;
    }

    exibir() {
        console.log(`ID: ${this.id} | Sala: ${this.#nome}`);
    }
}

class Atleta extends Pessoa {
    #idTurma;

    constructor(id, nome, idTurma) {
        super(id, nome);
        this.idTurma = idTurma;
    }

    set idTurma(novoId) {
        if (!novoId || novoId <= 0) {
            console.log("Turma inválida.");
            return;
        }

        this.#idTurma = novoId;
    }

    get idTurma() {
        return this.#idTurma;
    }

    exibir(nomeTurma) {
        console.log(
            `ID: ${this.id} | Atleta: ${this.nome} | Turma: ${nomeTurma}`
        );
    }
}

class Arbitro extends Pessoa {
    #numeroCredencial;
    #anosExperiencia;

    constructor(id, nome, numeroCredencial, anosExperiencia) {
        super(id, nome);
        this.numeroCredencial = numeroCredencial;
        this.anosExperiencia = anosExperiencia;
    }

    set numeroCredencial(numero) {
        if (!numero || numero <= 0) {
            console.log("Número de credencial inválido.");
            return;
        }

        this.#numeroCredencial = numero;
    }

    get numeroCredencial() {
        return this.#numeroCredencial;
    }

    set anosExperiencia(anos) {
        if (anos < 0) {
            console.log("Anos de experiência inválidos.");
            return;
        }

        this.#anosExperiencia = anos;
    }

    get anosExperiencia() {
        return this.#anosExperiencia;
    }

    exibir() {
        console.log(
            `ID: ${this.id} | Árbitro: ${this.nome} | Credencial: ${this.#numeroCredencial} | Experiência: ${this.#anosExperiencia} anos`
        );
    }
}

class ArenaConnect {
    constructor() {
        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
    }

    adicionarTurma() {
        const nome = prompt("Nome da nova turma: ");

        const turma = new Turma(
            this.idTurmaContador++,
            nome
        );

        this.turmas.push(turma);
        console.log("Turma registrada com sucesso.");
    }

    listarTurmas() {
        console.log("\n=== LISTA DE TURMAS ===");

        if (this.turmas.length === 0) {
            console.log("Nenhuma turma cadastrada.");
            return;
        }

        this.turmas.forEach(turma => turma.exibir());
    }

    editarTurma() {
        this.listarTurmas();

        const id = parseInt(prompt("ID da turma para editar: "));
        const turma = this.turmas.find(t => t.id === id);

        if (!turma) {
            console.log("ID não encontrado.");
            return;
        }

        const novoNome = prompt("Novo nome da turma: ");
        turma.nome = novoNome;

        console.log("Dados atualizados.");
    }

    removerTurma() {
        this.listarTurmas();

        const id = parseInt(prompt("ID da turma para remover: "));
        const quantidade = this.turmas.length;

        this.turmas = this.turmas.filter(
            turma => turma.id !== id
        );

        if (this.turmas.length < quantidade) {
            console.log("Turma removida.");
        } else {
            console.log("ID não encontrado.");
        }
    }

    adicionarAtleta() {
        this.listarTurmas();

        const idTurma = parseInt(
            prompt("ID da turma do atleta: ")
        );

        const turma = this.turmas.find(
            t => t.id === idTurma
        );

        if (!turma) {
            console.log("Turma inválida.");
            return;
        }

        const nome = prompt("Nome do atleta: ");

        const atleta = new Atleta(
            this.idAtletaContador++,
            nome,
            idTurma
        );

        this.atletas.push(atleta);

        console.log(
            `Atleta "${nome}" vinculado à turma ${turma.nome}.`
        );
    }

    adicionarArbitro() {
        const nome = prompt("Nome do árbitro: ");
        const numeroCredencial = parseInt(
            prompt("Número da credencial: ")
        );
        const anosExperiencia = parseInt(
            prompt("Anos de experiência: ")
        );

        const arbitro = new Arbitro(
            this.idArbitroContador++,
            nome,
            numeroCredencial,
            anosExperiencia
        );

        this.arbitros.push(arbitro);

        console.log("Árbitro registrado com sucesso.");
    }

    listarArbitros() {
        console.log("\n=== LISTA DE ÁRBITROS ===");

        if (this.arbitros.length === 0) {
            console.log("Nenhum árbitro cadastrado.");
            return;
        }

        this.arbitros.forEach(
            arbitro => arbitro.exibir()
        );
    }

    testarPolimorfismo() {
        console.log("\n=== TESTE DE POLIMORFISMO ===");

        const pessoas = [
            ...this.atletas,
            ...this.arbitros
        ];

        if (pessoas.length === 0) {
            console.log("Nenhuma pessoa cadastrada.");
            return;
        }

        pessoas.forEach(pessoa => {
            if (pessoa instanceof Atleta) {
                const turma = this.turmas.find(
                    t => t.id === pessoa.idTurma
                );

                pessoa.exibir(
                    turma ? turma.nome : "Turma não encontrada"
                );
            } else {
                pessoa.exibir();
            }
        });
    }
}

function main() {
    const sistema = new ArenaConnect();

    while (true) {
        console.log(`
 ==============================
 ARENA-CONNECT v2.0 - PBE1
 ==============================
 1. Registrar Turma
 2. Listar Turmas
 3. Editar Turma
 4. Remover Turma
 5. Registrar Atleta
 6. Registrar Árbitro
 7. Listar Árbitros
 8. Testar Polimorfismo
 0. Sair
 ==============================`);

        const opcao = prompt("Escolha: ");

        if (opcao === "1") {
            sistema.adicionarTurma();
        } else if (opcao === "2") {
            sistema.listarTurmas();
        } else if (opcao === "3") {
            sistema.editarTurma();
        } else if (opcao === "4") {
            sistema.removerTurma();
        } else if (opcao === "5") {
            sistema.adicionarAtleta();
        } else if (opcao === "6") {
            sistema.adicionarArbitro();
        } else if (opcao === "7") {
            sistema.listarArbitros();
        } else if (opcao === "8") {
            sistema.testarPolimorfismo();
        } else if (opcao === "0") {
            break;
        } else {
            console.log("Opção inválida.");
        }
    }
}

main();