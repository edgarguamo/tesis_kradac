var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuario.controller');

router.route('/')
    .get(usuarioController.listUsers)
    .post(usuarioController.createUser);

router.route('/:id')
    .get(usuarioController.getUser)
    .put(usuarioController.updateUser)
    .delete(usuarioController.deleteUser)

module.exports = router;