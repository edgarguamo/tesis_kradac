const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuariosComentariosSchema = new Schema({
  IdRegistro: {
    type: Number,
    unique: true,
  },
  IdUsuarioAtendio: Number,
  FechaHoraRegistro: String,
  ComentarioCliente: String,
  ComentarioConductor: String,
  ValoracionCliente: Number,
  ValoracionConductor: Number,
  CalificacionClientes: String,
  CalificacionChoferes: String,
});

//Calificacion en funcion de la fecha

UsuariosComentariosSchema.statics.getAll = function (cb) {
  this.find(
    {
      FechaHoraRegistro: {
        $gte: "2021-01-01",
        $lte: "2021-01-02",
      },
    },
    cb
  );
};

UsuariosComentariosSchema.statics.add = function (object, cb) {
  this.create(object, cb);
};

UsuariosComentariosSchema.statics.findByIdRegistro = function (IdRegistro, cb) {
  this.findOne({ IdRegistro: IdRegistro }, cb);
};

UsuariosComentariosSchema.statics.filter = function (
  FechaHoraRegistro,
  ValoracionClientes,
  ValoracionConductores,
  CalificacionClientes,
  CalificacionChoferes,
  cb
) {
  this.find(
    {
      FechaHoraRegistro: new RegExp(FechaHoraRegistro, "i"),
      ValoracionClientes: ValoracionClientes,
      ValoracionConductores: ValoracionConductores,
      CalificacionClientes: CalificacionClientes,
      CalificacionChoferes: CalificacionChoferes,
    },
    cb
  );
};
UsuariosComentariosSchema.statics.getAllTest = function (data, cb) {
  if (data.TipoConsulta !== undefined) {
    console.log("consulta de test solo fecha");
    this.find(
      {
        FechaHoraRegistro: {
          $gte: data.FechaInicio,
          $lte: data.FechaFin,
        },
      },
      {
        ComentarioCliente: 0,
        ComentarioConductor: 0,
        FechaHoraRegistro: 0,
      },
      cb
    );
  } else {
    console.log("consulta por defecto solo por fecha");
    this.find(
      {
        FechaHoraRegistro: {
          $gte: "2021-01-01",
          $lte: "2021-01-31",
        },
      },
      {
        ComentarioCliente: 0,
        ComentarioConductor: 0,
        FechaHoraRegistro: 0,
      },
      cb
    );
  }
};

module.exports = mongoose.model(
  "Usuarios_Comentarios",
  UsuariosComentariosSchema
);
