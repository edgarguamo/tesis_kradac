var express = require('express');
var router = express.Router();
var UsuariosComentariosRouter = require('./usuarios_comentarios.route');

router.use('/usuarios_comentarios', UsuariosComentariosRouter);

module.exports = router;