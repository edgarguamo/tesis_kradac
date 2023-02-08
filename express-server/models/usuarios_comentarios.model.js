const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuariosComentariosSchema = new Schema({
  IdRegistro: {
    type: Number,
    unique: true,
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
  CalificacionChoferes: String,
});

//Calificacion en funcion de la fecha

UsuariosComentariosSchema.statics.getAll = function (cb) {
  this.find({ FechaHoraRegistro: new RegExp("2021-01-01", "i") }, cb);
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
  //const query = new mongoose.Query();

  switch (data.TipoConsulta) {
      //Consulta por contenido
    case "3":
      //Consulta solo por valoracion clientes
      if (
        data.ValoracionCliente !== undefined ||
        data.ValoracionChoferes === undefined
      ) {
        this.find(
          {
            FechaHoraRegistro: new RegExp(data.FechaInicio, "i"),
            ValoracionClientes: parseInt(data.ValoracionClientes),
          },
          cb
        );
        break;
      }
      //Consulta solo por valoracion choferes
      if (
        data.ValoracionCliente === undefined ||
        data.ValoracionChoferes !== undefined
      ) {
        this.find(
          {
            FechaHoraRegistro: new RegExp(data.FechaInicio, "i"),
            ValoracionChoferes: parseInt(data.ValoracionChoferes),
          },
          cb
        );
        break;
      }
      //Consulta solo por valoracion clientes y valoracion choferes
      if (
        data.ValoracionCliente !== undefined ||
        data.ValoracionChoferes !== undefined
      ) {
        this.find(
          {
            
            FechaHoraRegistro: new RegExp(data.FechaInicio, "i"),
            ValoracionChoferes: parseInt(data.ValoracionChoferes),
            ValoracionClientes: parseInt(data.ValoracionClientes),
          },
          cb
        );
        break;
      }
      //Consulta solo por fecha
      if (
        data.ValoracionCliente === undefined ||
        data.ValoracionChoferes === undefined
      ) {
        this.find(
          {
            FechaHoraRegistro: new RegExp(data.FechaInicio, "i"),
          },
          cb
        );
        break;
      }
      break;
    case "2":
      break;
    default:
      console.log('consulta por defecto solo por fecha')
      this.find({ FechaHoraRegistro: new RegExp("2021-01-01", "i") }, cb);
      break;
  }
};

module.exports = mongoose.model(
  "Usuarios_Comentarios",
  UsuariosComentariosSchema
);
