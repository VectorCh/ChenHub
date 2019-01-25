'use strict'
//var dbpool = require("../server/mysqlLib.js");
var express = require( 'express' );
var router = express.Router();
var app = express();
/* Routes */
app.get( '/test', function( req, res ) {
	res.sendFile( '/static/pagina1.html' )
} );
/* Routes->services */
router.get( '/services/sim_data', simulation_process );

function simulation_process( req, res ) {
	let data;
	console.log( "Entro simulation_process" );
	let json = req.query;
	console.log( json.proceso );
	let sql = `select sensor, device_name from processes_sensors where process = \'` + json.proceso + `\'`;
	db.raw( sql ).then(
		( resultset ) => {
			data = resultset.rows;
			console.log( data.length );
			console.log( data[ 0 ].device_name );
			res.json( {
				devices_name: data[ 0 ].device_name,
			} );
		} );
}
module.exports = router;