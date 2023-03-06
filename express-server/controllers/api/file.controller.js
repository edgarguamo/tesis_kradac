var json2csv = require("json2csv").parse;
var csv = require("fast-csv");
var mongoose = require("mongoose");
var FileData = require("../../models/file.model");

/* 
  Lectura del archivo
*/

exports.formatData = function (req, res) {
  var fields = [
    "id_usuario_atendio",
    "fecha_hora_registrada",
    "observacion",
    "observacion_conductor",
    "valoracion",
    "valoracion_conductor",
  ];
  var csv = json2csv({ data: "", fields: fields });
  res.set("Content-Disposition", "attachment;filename=comments.csv");
  res.set("Content-Type", "application/octet-stream");
  res.send(csv);
};

/* 
  cargar archivo
*/

exports.pushData = function (req, res) {
  if (!req.files) return res.status(400).send("El Archivo no fue Cargado");
  
  var fileData = req.files.file;
  var comments = [];
  csv
    .parseString(fileData.data.toString(), {
      headers: true,
      ignoreEmpty: true,
    })
    .on("data", function (data) {
      //generate a id for row
      data["_id"] = new mongoose.Types.ObjectId();
      comments.push(data);
    })
    .on("end", function () {
      FileData.create(comments, function (err, documents) {
        if (err) throw err;
      });
      res.send(comments.length + " comments have been successfully uploaded.");
    });

  try{
    const spawn = require('child_process').spawn;
    const pythonProcess = spawn('python', ['./analyzer/main.py']);
    let pythonResponse = '';

    pythonProcess.stdout.on('data', function(data){
      pythonResponse += data.toString()
    });
    pythonProcess.stdout.on('end');
    console.log(pythonResponse)
  }catch{
    console.log('fallo en la carga de archivos al sistema')
  }
};
