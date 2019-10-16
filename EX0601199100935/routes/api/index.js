var express = require('express');
var router = express.Router();


//Rutas de cada entidad 

var fotosApiRoutes = require('./fotos/index');

//localhost:3000/api/prd
router.use('/foto', fotosApiRoutes);


module.exports = router;