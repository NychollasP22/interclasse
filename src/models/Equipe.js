const Modalidade = require('./Modalidade')

class Equipe {
    #id;
    #idTurma;
    #modalidade;
    #atletas = [];

    constructor(id, idTurma, modalidade) {
        this.#id = id;
        this.#idTurma = idTurma;
        this.#modalidade = modalidade;
    }

    get id() {
        return this.#id;
    }

    get idTurma() {
        return this.#idTurma;
    }

    get modalidade() {
        return this.#modalidade;
    }

    get atletas() {
        return this.#atletas;
    }

    exibir(turma) {
        console.log(
            `ID: ${this.id} | Turma: ${turma} | Modalidade: ${this.modalidade} | Atletas: ${this.atletas.length}`
        );
    }
}


module.exports = { 
    Equipe }