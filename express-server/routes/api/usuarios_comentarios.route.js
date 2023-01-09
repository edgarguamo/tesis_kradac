var express = require('express');
var router = express.Router();
var UsuariosComentariosController = require('../../controllers/api/usuarios_comentarios.controller');

router.get('/', UsuariosComentariosController.listAll);
router.get('/:id', UsuariosComentariosController.getItem);
router.get('/filtrado', UsuariosComentariosController.getItem);

module.exports = router;