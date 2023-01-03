var express = require('express');
var router = express.Router();
var UsuariosComentariosController = require('../../../controllers/api/public/usuarios_comentarios.controller');

router.get('/', UsuariosComentariosController.listAll);
router.get('/:id', UsuariosComentariosController.getItem);

module.exports = router;