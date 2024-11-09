import express from "express";
import db from "./config/dbConnect.js";
import manipuladorDeErros from "../middlewares/manipuladorDeErros.js";
import manipulador404 from "../middlewares/manipulador404.js";
import routes from "./routes/index.js";

