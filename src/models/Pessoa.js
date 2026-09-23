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

    set nome(nome) {
        if (!nome || nome.length < 3) {
            console.log("Nome inválido.");
            return;
        }
        this.#nome = nome;
    }

    get nome() {
        return this.#nome;
    }

    exibir() {
        console.log(`ID: ${this.id} | Pessoa: ${this.nome}`);
    }
}

class Atleta extends Pessoa {
    #idTurma;

    constructor(id, nome, idTurma) {
        super(id, nome);
        this.#idTurma = idTurma;
    }

    get idTurma() {
        return this.#idTurma;
    }

    exibir(turma) {
        console.log(`ID: ${this.id} | Atleta: ${this.nome} | Turma: ${turma}`);
    }
}

class Arbitro extends Pessoa {
    #numeroCredencial;
    #anosExperiencia;

    constructor(id, nome, credencial, experiencia) {
        super(id, nome);
        this.#numeroCredencial = credencial;
        this.#anosExperiencia = experiencia;
    }

    get numeroCredencial() {
        return this.#numeroCredencial;
    }

    get anosExperiencia() {
        return this.#anosExperiencia;
    }

    exibir() {
        console.log(
            `ID: ${this.id} | Árbitro: ${this.nome} | Credencial: ${this.numeroCredencial} | Experiência: ${this.anosExperiencia} ano(s)`
        );
    }
}

module.exports = {
    Pessoa,
    Atleta,
    Arbitro
};