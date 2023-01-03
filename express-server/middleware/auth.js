const jwt = require("jsonwebtoken");

const verifyToken = function(req, res, next) {
    const token = req.body.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Se requiere un token para la autenticación");
    }

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
		if (err) {
            console.log(err.message);
			res.status(401).json({
				status: "error", 
				message: "Token Invalido"
			});
		} else {
			req.user = decoded;
			console.log('jwt verify: ' + decoded);
			next();
		}
	});
};

module.exports = verifyToken;