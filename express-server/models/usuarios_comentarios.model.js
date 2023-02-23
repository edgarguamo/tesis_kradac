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
  //const query = new mongoose.Query();
  console.log(fechaFin);
  var fechaFin = new Date(data.FechaFin);
  fechaFin.setTime(fechaFin.getTime() + 86400000);
  fechaFin = fechaFin.toString();
  console.log(fechaFin);
  switch (data.TipoConsulta) {
    //Consulta por contenido
    case "3":
      //Consulta solo por valoracion clientes
      if (
        data.ValoracionCliente !== undefined ||
        data.ValoracionChoferes === undefined
      ) {
        console.log("consulta solo choferes");
        this.find(
          {
            FechaHoraRegistro: {
              $gte: data.FechaInicio,
              $lte: data.FechaFin,
            },

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
        console.log("consulta solo cliente");
        this.find(
          {
            FechaHoraRegistro: {
              $gte: data.FechaInicio,
              $lte: data.FechaFin,
            },
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
        console.log("consulta de test");
        this.find(
          {
            FechaHoraRegistro: {
              $gte: data.FechaInicio,
              $lte: data.FechaFin,
            },
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
        console.log("consulta de test solo fecha");
        this.find(
          {
            FechaHoraRegistro: {
              $gte: data.FechaInicio,
              $lte: data.FechaFin,
            },
          },
          cb
        );
        break;
      }
      break;
    case "2":
      if (
        data.ValoracionCinicial !== undefined ||
        data.ValoracionCfinal !== undefined
      ) {
        console.log("consulta valoracion choferes");
        this.find(
          {
            FechaHoraRegistro: {
              $gte: data.FechaInicio,
              $lte: data.FechaFin,
            },
            ValoracionClientes:{
              $gte: data.ValoracionCinicial,
              $lte: data.ValoracionCfinal
          },
        },
          cb
        );
        break;
      }
if (
        data.ValoracionCinicial !== undefined ||
        data.ValoracionCfinal !== undefined
      ) {
        console.log("consulta valoracion choferes");
        this.find(
          {
            FechaHoraRegistro: {
              $gte: data.FechaInicio,
              $lte: data.FechaFin,
            },
            ValoracionClientes: parseInt(data.ValoracionCinicial),
          },
          cb
        );
        break;
      }
    default:
      console.log("consulta por defecto solo por fecha");
     /*
      var tiempo = Date.now();
      var hoy = new Date(tiempo).toISOString();
      console.log(hoy.substring(0,12));
      */
      this.find(
        {
          FechaHoraRegistro: {
            $gte: "2021-01-01",
            $lte: "2021-01-31",
          },
        },
        cb
      );
      break;
  }
};

module.exports = mongoose.model(
  "Usuarios_Comentarios",
  UsuariosComentariosSchema
);
