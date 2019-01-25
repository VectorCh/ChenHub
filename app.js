var express = require( 'express' );
var path = require( 'path' );
var app = express();
var port = 8888;
// serving static pages
app.use( express.static( __dirname + '/' ) );
// app.get('/',function(req,res){
//   res.redirect('/redir');
// });
app.get( '/media', function( req, res ) {
	res.redirect( '/' );
} );
app.get( '/procesing', function( req, res ) {
	res.sendFile( path.join( __dirname + '/public/central.html' ) );
} );
app.get( '/test', function( req, res ) {
	res.sendFile( path.join( __dirname + '/public/testeo.html' ) );
} );
// app.get('/users/:userId/books/:bookId', function (req, res) {
//   // Access userId via: req.params.userId
//   // Access bookId via: req.params.bookId
//   res.send(req.params);
// })
var walk = require( './routes/scanDir.js' );
var category = require('./routes/category.js');
app.use( '/scan', walk ); // Scaneo de  directorios (sync) y escritura
app.use( '/cat', category ); // Resturn content of a particular category
app.listen( port, function() {
	console.log( `Server started in http://localhost:${port}` );
} );