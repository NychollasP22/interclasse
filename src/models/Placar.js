class Placar {
    #golsA;
    #golsB;

    constructor(golsA, golsB) {
        this.#golsA = golsA;
        this.#golsB = golsB;
    }

    get golsA() {
        return this.#golsA;
    }

    get golsB() {
        return this.#golsB;
    }
}

module.exports = Placar;    