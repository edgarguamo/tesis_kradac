var Usuario = require('../../models/usuario.model');

exports.listUsers = function(req, res) {
    Usuario.getAll((err, usuarios) => {
        if (err) 
            return res.send(500, err.message);
        res.status(200).json(usuarios);
    });
}

exports.createUser = function (req, res) {
	var usuario = new Usuario({ 
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
        password: req.body.password,
        rol: req.body.rol 
	});
	usuario.save(function (err) {
		if (err) 
            return res.status(500).send(err.message);
		res.status(200).json(usuario);
	});
}

exports.getUser = function(req, res){
    Usuario.findByIdUsuario(req.params.id, (err, usuario) => {
    	if (err) 
            return res.send(500, err.message);
    	if (usuario) {
    		res.status(200).json(usuario);
    	}
    	else {
    		res.status(404).send("Not found Usuario");
    	}
    });
}

exports.updateUser = function(req, res) {
    Usuario.findByIdUsuario(req.params.id, (err, targetUser) => {
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
        }

        if (!targetUser) {
            res.status(400).send('No se encontro usuario');
            return;
        }

        if (req.body.first_name && targetUser.first_name !== req.body.first_name) {
            targetUser.first_name = req.body.first_name;
        }

        if (req.body.last_name && targetUser.last_name !== req.body.last_name) {
            targetUser.last_name = req.body.last_name;
        }
        
        if (req.body.email && targetUser.email !== req.body.email) {
            targetUser.email = req.body.email;
        }

        if (req.body.rol && targetUser.rol !== req.body.rol) {
            targetUser.rol = req.body.rol;
        }
        
        if (req.body.password && req.body.password != "") {
            if (!targetUser.isSamePassword(req.body.password)) {
                targetUser.password = req.body.password
            }
        }

        targetUser.save((err, usuario) => {
            if (err) 
                return res.status(500).send(err.message);
            res.status(200).json(usuario);
        });
    });
}

exports.deleteUser = function(req, res, next) {
    Usuario.findByIdUsuarioAndRemove(req.params.id, function(err, targetUser) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (targetUser){
            return res.status(200).json(targetUser);
        } 
        else {
            return res.status(404).send('Not found Usuario');
        }
    });
}