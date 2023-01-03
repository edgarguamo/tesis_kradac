var express = require('express');
var router = express.Router();

var authRouter = require('./auth.route');
var publicRouter = require('./public');
var usuarioRouter = require('./usuario.route');
var usuariosComentariosRouter = require('./usuarios_comentarios.route');
const authVerify = require("../../middleware/auth");

router.use('/auth', authRouter);
router.use('/public', publicRouter);
router.use('/usuarios', usuarioRouter);
router.use('/usuarios_comentarios', authVerify, usuariosComentariosRouter);

module.exports = router;