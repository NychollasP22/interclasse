class Turma {
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
        if (!nome || nome.length < 2) {
            console.log("Nome de turma inválido.");
            return;
        }
        this.#nome = nome.toUpperCase();
    }

    get nome() {
        return this.#nome;
    }

    exibir() {
        console.log(`ID: ${this.id} | Sala: ${this.nome}`);
    }
}
module.exports = Turma;