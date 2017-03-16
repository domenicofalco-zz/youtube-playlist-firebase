var connect = require('connect');
var port = 3000;
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/public')).listen(port, function(){
  console.log('Server running on: http://localhost:' + port + '/');
});
