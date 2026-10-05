const Placar = require('./Placar');

class Partida {
    #id;
    #idA;
    #idB;
    #modalidade;
    #placar;

    constructor(id, idA, idB, modalidade, golsA, golsB) {
        this.#id = id;
        this.#idA = idA;
        this.#idB = idB;
        this.#modalidade = modalidade;
        this.#placar = new Placar(golsA, golsB);
    }

    get id() {
        return this.#id;
    }

    get idA() {
        return this.#idA;
    }

    get idB() {
        return this.#idB;
    }

    get modalidade() {
        return this.#modalidade;
    }

    get placar() {
        return this.#placar;
    }
}

module.exports = Partida;
