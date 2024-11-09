import mongoose from "mongoose";
import ErroBase from "../src/errors/ErroBase.js";
import RequisicaoIncorreta from "../src/errors/RequisicaoIncorreta.js";
import ErroValidacao from "../src/errors/ErroValidacao.js";
import NaoEncontrado from "../src/errors/NaoEncontrado.js";

function manipuladorDeErros(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviaResposta(res);
    } else if (err instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(err).enviaResposta(res);
    } else if (err instanceof NaoEncontrado) {
        err.enviaResposta(res);
    } else {
        new ErroBase().enviaResposta(res);
    }
}

export default manipuladorDeErros;