import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const result = await autores.find();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    static lestarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorLocalizado = await autores.findById(id);

            if (autorLocalizado) {
                res.status(200).send(autorLocalizado);
            } else {
                next (new NaoEncontrado("Autor não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const autor = new autores(req.body);
            const autoresAlvo = await autor.save();
            res.status(201).send(autoresAlvo.toJSON());
        } catch (error) {
            next(error);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorAtualizado = await autores.findByAndUpdate(id, {$set: req.body});
            res.status(200).send({message: `Autor: ${autorAtualizado} atualizado com sucesso.`});
        } catch (error) {
            next(error);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorDeletado = await autores.findByIdAndDelete(id);
            res.status(200).send({message: `Autor: ${autorDeletado} deletado com sucesso.`});
        } catch (error) {
            next(error);
        }
    };
}
