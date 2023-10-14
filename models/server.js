const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuarioPath = '/api/usuarios';
    this.peliculaPath = '/api/peliculas';
    this.funcionPath = '/api/funciones';
    this.boletoPath = '/api/boletos';
    this.facturaPath = '/api/facturas';

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuarioPath, require('../routes/usuario'));
    this.app.use(this.peliculaPath, require('../routes/peliculas'));
    this.app.use(this.funcionPath, require('../routes/funciones'));
    this.app.use(this.boletoPath, require('../routes/boleto'));
    this.app.use(this.facturaPath, require('../routes/factura'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;