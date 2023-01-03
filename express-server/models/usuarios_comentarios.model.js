const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuariosComentariosSchema = new Schema({
    IdRegistro: {
        type: Number,
        unique: true
    },
    IdUsuarioAtendio: Number,
    FechaHoraRegistro: String,
    //Fecha: String,
    //Hora: String,
    CalificacionClientes: Number,
    CalificacionChoferes: Number,
    ComentarioCliente: String,
    ComentarioConductor: String,
    ValoracionCliente: Number,
    ValoracionConductor: Number
});


UsuariosComentariosSchema.statics.getAll = function(cb) {
	this.find({}, cb);
}

UsuariosComentariosSchema.statics.add = function(object, cb) {
	this.create(object, cb);
}

UsuariosComentariosSchema.statics.findByIdRegistro = function(idRegistro, cb) {
	this.findOne({IdRegistro: idRegistro}, cb);
}

module.exports = mongoose.model('Usuarios_Comentarios', UsuariosComentariosSchema);