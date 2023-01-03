const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {};

AuthController.login = function(req, res, next) {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
        res.status(400).send("Se requiere todas las entradas");
    }

    Usuario.findOne({email: email}, function(err, userInfo) {
        if (err) {
            next(err);
        }
        else {
            // Validate user exists
            if (userInfo === null) {
                return res.status(400).json({
                    status: "error", 
                    message: 'Usuario no existe',
                    data: null
                });
            }
            if (userInfo != null && bcrypt.compareSync(password, userInfo.password)) {
                const token = jwt.sign({id: userInfo._id}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
                res.status(200).json({
                    status: "ok",
                    message: "Usuario encontrado", 
                    data: {
                        usuario: {
                            idUsuario: userInfo.idUsuario,
                            first_name: userInfo.first_name,
                            last_name: userInfo.last_name,
                            email: userInfo.email,
                            rol: userInfo.rol
                        },
                        token: token
                    }
                });
            } 
            else {
                res.status(400).json({
                    status:"error", 
                    message: "Contraseña incorrecta",
                    data: null
                });
            }
        }
    });
}

AuthController.logout = function(req, res) {
    const token = req.body.token;

    if (token == null) 
        res.status(400).json({
            status:"error", 
            message: "Token no debe estar vacio",
            data: null
        });

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
		if (err) {
			res.status(401).json({
				status: "error", 
				message: err.message,
                data: null
			});
		} 
        else {
            // El token es valido, y se procede a invalidarlo
			console.log('jwt verify: ' + decoded);
            console.log(decoded);
            jwt.sign(decoded, "xxx", (err, logout) => {
                if (err) {
                    res.status(500).json({
                        status: "error", 
                        message: err.message,
                        data: null
                    });
                }
                if (logout) {
                    res.status(200).json({
                        status: "ok",
                        message : 'Usted se ha deslogueado',
                        data: null
                    });
                } else {
                    res.status(500).json({
                        status: "error", 
                        message: "Error",
                        data: null
                    });
                }
            });
		}
	});
}

module.exports = AuthController;