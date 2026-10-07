class Placar {
    #golsA;
    #golsB;

    constructor(golsA, golsB) {
        this.golsA = golsA;
        this.golsB = golsB;
    }

    set golsA(valor) {
        if (!Number.isInteger(valor) || valor < 0) {
            throw new Error('Gols da equipe A devem ser inteiros maiores ou iguais a zero.');
        }

        this.#golsA = valor;
    }

    get golsA() {
        return this.#golsA;
    }

    set golsB(valor) {
        if (!Number.isInteger(valor) || valor < 0) {
            throw new Error('Gols da equipe B devem ser inteiros maiores ou iguais a zero.');
        }

        this.#golsB = valor;
    }

    get golsB() {
        return this.#golsB;
    }

    vencedor() {
        if (this.#golsA > this.#golsB) {
            return 'A';
        }

        if (this.#golsA < this.#golsB) {
            return 'B';
        }

        return 'EMPATE';
    }
}

module.exports = Placar;