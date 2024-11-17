import express from "express";
import LivroController from "../controllers/livrosController.js";
import livros from "../models/Livros.js";

const router = express.Router();
/*
    Quando estamos projetando as rotas, sempre temos que organizar da mais específica para a menos específica.
    Se invertermos essa ordem, vamos ter um erro na requisição
 */

router
    .get("/livros", LivroController.listarLivros)
    .get("/livros/buscar", LivroController.listarLivroPorFiltro) //Mais específica
    .get("/livros/:id", LivroController.listarLivroPorId) //Menos específica
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.excluirLivro);

export default router;

