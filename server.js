class Atleta {
    constructor(nomeAtleta, idadeAtleta) {
        this.nomeAtleta = nomeAtleta;
        this.idadeAtleta = idadeAtleta;
    }

    registrar() {
        console.log("Atleta registrado:", this.nomeAtleta);
        console.log("Idade:", this.idadeAtleta);
    }
}

let atleta1 = new Atleta("Cypher", 19);

atleta1.registrar();


class Turma {
    constructor(nomeTurma, idadeTurma) {
        this.nomeTurma = nomeTurma;
        this.idadeTurma = idadeTurma;
    }

    registrar() {
        console.log("Turma registrada:", this.nomeTurma);
        console.log("Idade:", this.idadeTurma);
    }
}

let turma1 = new Turma("Cypher", 19);

turma1.registrar();