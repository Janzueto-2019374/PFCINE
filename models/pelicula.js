const { Schema, model } = require('mongoose');

const peliculaSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'El titulo es obligatorio'],
  },
  imagenPoster: {
    type: String,
  },
  clasificacion: { //G, PG, PG-13, etc.
    type: String,
  },
});

module.exports = model('Pelicula', peliculaSchema);
