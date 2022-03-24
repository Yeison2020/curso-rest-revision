const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Connect database
    this.connectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }
  // Here I create my function and connected my database
  connectarDB = async () => {
    await dbConnection();
  };

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    // Me permite leer cuando recivo mi request
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
