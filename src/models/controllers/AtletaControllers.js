const AtletaViews = require("../views/AtletaViews");

const AtletaController = {

    adicionar(sistema) {

        const idTurma =
            AtletaViews.perguntarIdTurma();

        try {

            sistema.buscarTurmaOuFalhar(
                idTurma
            );

            const nome =
                AtletaViews.perguntarNome();

            const { atleta, turma } =
                sistema.adicionarAtleta(
                    idTurma,
                    nome
                );

            AtletaViews.mostrarAtletaVinculado(
                atleta.nome,
                turma.nome
            );

        } catch (erro) {

            AtletaViews.mostrarErroCadastro(
                erro.message
            );

        }

    },

    listar(sistema) {

        AtletaViews.listarAtletas(
            sistema.listarAtletas()
        );

    }

};

module.exports = AtletaController;