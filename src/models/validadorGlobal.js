import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validador: (valor) => valor.trim() !== "",
    message: ({path}) => `O campo '${path}' não foi preenchido`
});

