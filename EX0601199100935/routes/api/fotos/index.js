var express = require('express');
var router = express.Router();
var fileModel = require('../filemodel');

var fotoCollection = [];


fileModel.loadFromFile(
  function(err, savedCollection){
    if(err){
      return;
    }
    fotoCollection = savedCollection;
    return;
  }
);

var fotoStruct = {
  id:0,
  title:'',
  url:'',
  thumbnailUrl:'',
  album:''
}

fotoCollection.push(
  Object.assign(
    {},
    fotoStruct,
    {
      id:100,
      title:'Fondo',
      url:'aaaaa',
      thumbnailUrl:'aaaa',
      album:'aaaah'
      
    }
    )
);

router.get('/all', function(req, res){
  res.json(fotoCollection);
});

router.post('/new', function(req, res){
   var newFoto = Object.assign(
      {},
      req.body,
      {
          "id":parseInt(req.body.id),
          "title":req.body.title,
          "url":req.body.url,
          "thumbnailUrl":req.body.thumbnailUrl,
          "album":req.body.album
      }
   );
   var fotoExists = fotoCollection.find(
     function(o, i){
       return o.id === newFoto.id;
     }
   )
   if( ! fotoExists ){
     fotoCollection.push(newFoto);
     fileModel.saveToFile(
        fotoCollection,
        function(err, savedSuccesfully){
          if(err){
            res.status(400).json({ "error": "No se pudo ingresar objeto" });
          } else {
            res.json(newFoto);  // req.body ===  $_POST[]
          }
        }
      );
   } else {
     res.status(400).json({"error":"No se pudo ingresar objeto"});
   }
}); // post /new

router.put('/update/:id',
  function(req, res){
      var idToModify = req.params.id;
      var modFoto = {};
      var newFotoArray = fotoCollection.map(
        function(o,i){
          if( idToModify === o.id){            
            modFoto = Object.assign({
              "title":req.body.title,
              "url":req.body.url,
              "thumbnailUrl":req.body.thumbnailUrl,
              "album":req.body.album
            }, o);
          }
          return o;
        }
      ); // end map
    fotoCollection = newFotoArray;
    fileModel.saveToFile(
      fotoCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "No se pudo actualizar objeto" });
        } else {
          res.json(modFoto);  // req.body ===  $_POST[]
        }
      }
    );
  }
);// put :id


module.exports = router;