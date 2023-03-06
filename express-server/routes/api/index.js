var express = require('express');
var router = express.Router();

var authRouter = require('./auth.route');
var publicRouter = require('./public');
var usuarioRouter = require('./usuario.route');
var usuariosComentariosRouter = require('./usuarios_comentarios.route');
var template = require('../../controllers/api/file.controller');
const authVerify = require("../../middleware/auth");

router.use('/auth', authRouter);
router.use('/public', publicRouter);
router.use('/usuarios', usuarioRouter);
router.use('/usuarios_comentarios', authVerify, usuariosComentariosRouter);
router.get('/template', template.formatData);
//router.post('/template', upload.single('file'), template.post);
router.post('/template', template.pushData);
module.exports = router;