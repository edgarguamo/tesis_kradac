var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FileDataSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  id_usuario_atendio: Number,
  fecha_hora_registro: String,
  observacion: String,
  observacion_conductor: String,
  valoracion: Number,
  valoracion_conductor: Number,
});

var FileData = mongoose.model("FileData", FileDataSchema);

module.exports = FileData;
