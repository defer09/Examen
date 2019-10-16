var express = require('express');
var router = express.Router();


var fotoCollection = [];

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


module.exports = router;