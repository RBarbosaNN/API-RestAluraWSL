import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivrosController {

    static listarLivros = async (req, res, next) => {
        try {
            const result = await livros.find().populate("autor").exec();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    static listarLivrosPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroLocalizado = await livros.findById(id);
            if (livroLocalizado) {
                res.status(200).send(livroLocalizado);
            } else {
                next(new NaoEncontrado("Livro não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            const livro = new livros(req.body);
            const livroSalvo = await livro.save();
            res.status(201).send(livroSalvo.toJSON());
        } catch (error) {
            next(error);
        }
    };

    

}