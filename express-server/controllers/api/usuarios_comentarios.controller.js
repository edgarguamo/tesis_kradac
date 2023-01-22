var Usuarios_Comentarios = require('../../models/usuarios_comentarios.model');

exports.listAll = function(req, res) {
	Usuarios_Comentarios.getAll((err, lista) => {
		if (err) 
            return res.status(500).send({
				status: "error", 
				message: err.message
			});
		
		res.status(200).json(lista);
	});
}

exports.getItem = function(req, res){
    Usuarios_Comentarios.findByIdRegistro(req.params.id, (err, obj) => {
    	if (err) 
			return res.status(500).send({
				status: "error", 
				message: err.message
			});
    	if (obj) {
    		res.status(200).json(obj);
    	}
    	else {
    		return res.status(404).send({
				status: "not found", 
				message: "No se encontró Usuario_Comentarios con el ID Registro " + req.params.id
			});
    	}
    });
}

exports.getMyQuery = function (req, res) {
  Usuarios_Comentarios.filter(
    req.params.anio,
    req.params.mes,
    req.params.dia,
    req.params.hora,
    req.params.vCliente,
    req.params.vConductor,
	req.params.cCliente,
	req.params.cConductor,
    (err, obj) => {
      if (err)
        return res.status(500).send({
          status: "error",
          message: err.message,
        });
      if (obj) {
        res.status(200).json(obj);
      } else {
        return res.status(404).send({
          status: "not found",
          message: "No se pudo realizar la consulta",
        });
      }
    }
  );
};

/*6
exports.getMyQuery = function (req, res) {
	Usuarios_Comentarios.filter(
	  req.params.anio,
	  req.params.mes,
	  req.params.dia,
	  req.params.hora,
	  req.params.vCliente,
	  req.params.vConductor,
	  req.params.cCliente,
	  req.params.cConductor,
	  (err, obj) => {
		res.send('peticion correcta')
		console.log('eso tilin');
	  }
	);
  };
*/