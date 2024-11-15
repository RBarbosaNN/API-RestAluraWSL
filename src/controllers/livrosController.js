import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const result = await livros.find().populate("autor").exec();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    static listarLivroPorId = async (req, res, next) => {
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

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroAtualizado = await livros.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).send({ message: `Livro: ${livroAtualizado} atualizado com sucesso.` });
        } catch (error) {
            next(error);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroDeletado = await livros.findByIdAndDelete(id);
            res.status(200).send({ message: `Livro: ${livroDeletado} deletado com sucesso` });
        } catch (error) {
            next(error);
        }
    };

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);
            const result = await livros.find(busca).populate("autor");
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

}

async function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
    const regexTitulo = new RegExp(titulo, "i"); // O "i" ignora as diferenças entre maiúsculas e minúsculas
    const regexEditora = new RegExp(editora, "i");
    const regexNomeAutor = new RegExp(nomeAutor, "i");
    const busca = {};

    if (editora) busca.editora = regexEditora;
    if (titulo) busca.titulo = regexTitulo;

    if (minPaginas || maxPaginas) busca.numeroPaginas = {};

    //gte = Greater Than or Equal (MongoDB)
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;

    //lte = Less Than or Equal (MongoDB)
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: regexNomeAutor });

        const autorId = autor._id;

        busca.autor = autorId;
    }

    return busca;
}

export default LivroController;