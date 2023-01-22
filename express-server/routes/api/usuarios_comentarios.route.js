var express = require('express');
var router = express.Router();
var UsuariosComentariosController = require('../../controllers/api/usuarios_comentarios.controller');

router.get('/', UsuariosComentariosController.listAll);
router.get('/:id', UsuariosComentariosController.getItem);
router.get('/anio/mes/dia/hora/vCliente/vConductor/cCliente/cConductor', UsuariosComentariosController.getMyQuery);
///hora/vCliente/vConductor/cCliente/cConductor
/*
router.get('/anio/mes/dia', (req, res) =>{
    res.send('se llego');
    console.log('se llego')
});
*/


module.exports = router;