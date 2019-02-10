'use strict'
const fs = require( 'fs' );
const path = require( 'path' );
var express = require( 'express' );
var router = express.Router();
router.get( '/', central );
// router.get( '/category', getCategory );
const ROUTE = "E:/( asunto )/[ chenHub-produc ]/store/json";
var ARR_CATEGORY = [];

function central( req, res ) {
	let query = req.query; // Catch header 
	let dir = query.dir; // Catch dir
	const initial_folders = dir.split( "\\" );
	const initial_depth = ( initial_folders.length - 1 ); // number of folder (-1) = depth of current directory
	let array = [];
	array = walkSync( dir, array );
	parse( array, initial_depth );
	res.sendStatus( 200 );
}

function createFile( str_file, content ) {
	console.log( `Writing in ${str_file}...` )
	// Si existe el fichero lo sobreescribe - good
	fs.writeFile( `${ROUTE}/${str_file}`, content, ( err ) => {
		if ( err ) {
			console.error( err );
			return;
		};
		console.log( `File ${str_file} has been created` );
	} );
}

function parse( array, initial_depth ) {
	console.log( "Start parse data..." )
	let global_json = {};
	let global_arr = [];
	ARR_CATEGORY = [];
	for ( var i = 0; i < array.length; i++ ) { // All
		let file_json = {};
		let abs_file = array[ i ].replace( /\\/g, "/" ); // Ruta completa del fichero
		let arr_abs_file = array[ i ].split( "\\" );
		let file_depth = arr_abs_file.length;
		let file_name = arr_abs_file[ file_depth - 1 ]; // Nombre del fichero
		let folder_name_arr = [];
		for ( var ii = ( initial_depth + 1 ); ii < ( file_depth - 1 ); ii++ ) {
			//console.log( "name: " + arr_abs_file[ ii ] )
			folder_name_arr.push( arr_abs_file[ ii ] );
		}
		file_json[ "filePath" ] = abs_file;
		file_json[ "folder" ] = folder_name_arr;
		file_json[ "file" ] = file_name;
		global_arr.push( file_json );
		searchCategory( folder_name_arr );
	}
	global_json = JSON.stringify( {
		category: ARR_CATEGORY
	} );
	createFile( "category.json", global_json );
	global_json = JSON.stringify( {
		file: global_arr
	} );
	createFile( "central_vidus.json", global_json );
}

function searchCategory( array ) {
	if ( ARR_CATEGORY.length == 0 ) { // Si está vacío se mete
		ARR_CATEGORY.push( array )
	} else {
		let las_element = ( ARR_CATEGORY.length - 1 );
		let n_folder = ARR_CATEGORY[ ARR_CATEGORY.length - 1 ].length; // ... de la última entrada
		// ARR_CATEGORY
		if ( n_folder == array.length ) {
			// Compare all folder
			for ( var i = 0; i < n_folder; i++ ) {
				if ( ARR_CATEGORY[ las_element ][ i ].localeCompare( array[ i ] ) != 0 ) { // Con tal de que haya uno distinto se mete
					ARR_CATEGORY.push( array );
				}
			}
		} else {
			// distinta longitud
			ARR_CATEGORY.push( array );
		}
	}
}
/**
 * Method that search all element a specific directory
 * @param dir route in string (absolute path)
 * @param array
 * @return array of all element
 */
function walkSync( dir, filelist ) {
	if ( dir[ dir.length - 1 ] != '/' ) dir = dir.concat( '\\' )
	var fs = fs || require( 'fs' ),
		files = fs.readdirSync( dir );
	filelist = filelist || [];
	files.forEach( function( file ) {
		if ( fs.statSync( dir + file ).isDirectory() ) {
			filelist = walkSync( dir + file, filelist ); // recursive
		} else {
			filelist.push( dir + file );
		}
	} );
	return filelist;
}
module.exports = router; // Solución al error: Router.use() requires middleware function but got a Object