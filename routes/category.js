'use strict'
const fs = require( 'fs' );
const path = require( 'path' );
var express = require( 'express' );
var router = express.Router();
// app.get('/users/:userId/books/:bookId', function (req, res) {
//   // Access userId via: req.params.userId
//   // Access bookId via: req.params.bookId
//   res.send(req.params);
// })
router.get( '/:category', content );

function content( req, res ) {
	let category = req.params.category;
	 
	console.log(req.params.category)
	var json = JSON.stringify({ 
	example: req.params.category
	});
	res.end(json);
}
module.exports = router; // Solución al error: Router.use() requires middleware function but got a Object

