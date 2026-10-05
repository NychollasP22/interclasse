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

    adicionarAtleta(idAtleta) {
        if (this.#atletas.includes(idAtleta)) {
            return false;
        }

        this.#atletas.push(idAtleta);
        return true;
    }

    removerAtleta(idAtleta) {
        if (!this.#atletas.includes(idAtleta)) {
            return false;
        }

        this.#atletas = this.#atletas.filter(
            id => id !== idAtleta
        );

        return true;
    }

    exibir(turma, nomesAtletas) {
        console.log(
            `ID: ${this.id} | Turma: ${turma} | Modalidade: ${this.modalidade} | Atletas: ${this.atletas.length}`
        );

        nomesAtletas.forEach(
            nome => console.log(` - ${nome}`)
        );
    }
}

module.exports = Equipe;