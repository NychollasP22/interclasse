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

