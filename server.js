var connect = require('connect');
var serveStatic = require('serve-static');
console.log(__dirname)
connect().use(serveStatic(__dirname + '/public')).listen(3000, function(){
  console.log('Server running on 3000...');
});
