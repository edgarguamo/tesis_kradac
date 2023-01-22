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
    ComentarioCliente: String,
    ComentarioConductor: String,
    ValoracionCliente: Number,
    ValoracionConductor: Number,
    CalificacionClientes: String,
    CalificacionChoferes: String
});


//Calificacion en funcion de la fecha 

UsuariosComentariosSchema.statics.getAll = function(cb) {
    this.find({FechaHoraRegistro: new RegExp('2021-01-01', 'i')}, cb);
}

UsuariosComentariosSchema.statics.add = function(object, cb) {
	this.create(object, cb);
}

UsuariosComentariosSchema.statics.findByIdRegistro = function(IdRegistro, cb) {
	this.findOne({IdRegistro: IdRegistro}, cb);
}

UsuariosComentariosSchema.statics.filter = function (
  FechaHoraRegistro,
  ValoracionClientes,
  ValoracionConductores,
  CalificacionClientes,
  CalificacionChoferes,
  cb
) {
  this.find({
    FechaHoraRegistro: new RegExp(FechaHoraRegistro,'i'),
    ValoracionClientes: ValoracionClientes,
    ValoracionConductores: ValoracionConductores,
    CalificacionClientes: CalificacionClientes,
    CalificacionChoferes:  CalificacionChoferes
  }, cb);
};


module.exports = mongoose.model('Usuarios_Comentarios', UsuariosComentariosSchema);