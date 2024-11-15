import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    /*
        Estamos indicando aqui na chave "type" (linha 15) que a associação entre os dados
        irá ocorrer pelo id do "autor", representado pelo ObjectId que foi gerado automaticamente
        pelo MongoDB ao cadastrar um autor na coleção "autores" (arquivo Autor.js), 
        através de uma requisição POST (arquivo autoresRoutes.js)
        Além disso, na chave "ref" estamos fazendo referência ao nome da coleção no banco.
     */

    {
        id: { type: String },
        titulo: {
            type: String,
            required: [true, "É obrigatório informar o título do livro"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "autores",
            require: [true, "O nome do(a) autor(a) é obrigatório"]
        },
        editora: {
            type: String,
            require: [true, "É obrigatório informar a editora"],
            enum: {
                value: ["Casa do código", "WSL", "Kiko Corporations"],
                message: "A editora {VALUE} não é um valor permitido."
            }
        },
        numeroPaginas: {
            type: Number,
            validate: {
                validator: (valor) => {
                    return valor >= 10 && valor <= 5000;
                },
                message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
            }
        }
    }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;