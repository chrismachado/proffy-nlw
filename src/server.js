// Servidor
const express = require("express");
const server = express();

const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
} = require("./pages");

// configurar nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noChace: true,
});

// configurar servidor
server
  // enviar formulario escondido
  .use(express.urlencoded({ extended: true }))
  // configurar arquivos estaticos
  .use(express.static("public"))
  // configuracao de rotas
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .post("/save-classes", saveClasses)
  .listen(5500);
