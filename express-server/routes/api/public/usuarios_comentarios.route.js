var express = require('express');
var router = express.Router();
var UsuariosComentariosController = require('../../../controllers/api/public/usuarios_comentarios.controller');

router.get('/', UsuariosComentariosController.listAllTest);
router.get('/:id', UsuariosComentariosController.getItem);
router.get('/:FechaHoraRegistro/:ValoracionClientes/:ValoracionConductores/:CalificacionClientes/:CalificacionChoferes', UsuariosComentariosController.getMyQuery);


/*6
router.get('/:anio/:mes/:dia/:hora/:vCliente/:vConductor/:cCliente/:cConductor', (req, res) =>{
    res.send('se llego a la ruta final');
    console.log('se llego a la ruta final');
});
router.get('/:anio/:mes', (req, res) =>{
    res.send('se llego');
    console.log('se llego');
});
*/

module.exports = router;