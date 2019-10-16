var fs = require('fs');


var exportObject = {};
var filePath = "data.json";
var data = {
  fotos:[],
}


exportObject.getData = function(){
  return data;
};

exportObject.getFotos = function(){
  return data.fotos;
};

exportObject.setFotos= function(newfoto, handler){
  return data.fotos;
};

exportObject.saveToFile = function( collToSave, handler){
  fs.writeFile(
    filePath,
    JSON.stringify(collToSave),
    function(err){
      if(err){
        console.log(err);
        return handler(err, null);
      }
      return handler(null, true);
    }
  );
}

exportObject.loadFromFile = function( handler ){
  fs.readFile(
    filePath,
    'utf8',
    function(err, data){
      if(err){
        console.log(err);
        return handler(err, null);
      }
      return handler(null, JSON.parse(data));
    }
  );
}

module.exports = exportObject;