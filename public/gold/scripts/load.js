var CONTENT_PAGE = 12; // (deprecated) - pagination
var SELECTION = 2; // (deprecated) - pagination
var N_PAGE, N_FILE;
var IS_RUNNING = false; // semaphore
( function() {
	/**
	 * Function back to top
	 */
	render_beta( 0, 20 );
	$( window ).scroll( function() {
		if ( $( this ).scrollTop() > 50 ) {
			$( '#back-to-top' ).fadeIn();
		} else {
			$( '#back-to-top' ).fadeOut();
		}
	} );
	// scroll body to 0px on click
	$( '#back-to-top' ).click( function() {
		// $('#back-to-top').tooltip('hide'); // to search funtionality
		$( 'body,html' ).animate( {
			scrollTop: 0
		}, 975 );
		return false;
	} );
	// $('#back-to-top').tooltip('show'); // to search funtionality
} )();
/**
 * (Deprecated) - Pagination 
 */
function render( SELECTION ) {
	$( ".post" ).remove();
	$( ".page" ).remove();
	$.ajax( {
		url: "/store/json/files_vidus_ssd.json",
		success: function( result ) {
			SELECT = ( SELECTION == 0 ) ? ( 1 ) : ( SELECTION );
			object = result;
			N_FILE = object.info.n_file;
			N_PAGE = numberOfPage( N_FILE );
			let files = object.files;
			let all_element_last = files.length - 1;
			for ( var i = ( ( CONTENT_PAGE * SELECT ) - CONTENT_PAGE );
				( i < CONTENT_PAGE * SELECT ) && ( i < N_FILE ); i++ ) {
				show_content( files[ i ] );
			}
			nav_page( N_PAGE, SELECTION );
		}
	} );
}
/**
 * Coge los siguientes elementos para mostrarlo (show_content)
 * @param lasElement último elemento(post) en la página
 * @param quantity cantidad de elementos a mostrar
 */
function render_beta( lastElement, quantity ) {
	let isLastElement = false;
	$( "#load-cont" ).removeClass( "none" );
	$( ".b-load" ).remove();
	$.ajax( {
		url: "/store/json/central_vidus.json",
		success: function( data ) {
			object = data;
			let files = object.file;
			N_FILE = files.length; // numero total de ficheros
			let all_element_last = files.length - 1;
			var i = 0;
			for ( i = lastElement; i < ( lastElement + quantity ) && ( i < N_FILE ); i++ ) {
				if ( i == ( ( lastElement + quantity ) - 1 ) ) isLastElement = true;
				show_content( files[ i ], isLastElement );
			}
			if ( i == N_FILE ) $( "#load-cont" ).addClass( "none" )
		}
	} );
}

function renderAll( lastElement, quantity ) {
	let isLastElement = false;
	$( "#load-cont" ).removeClass( "none" );
	$( ".b-load" ).remove();
	$.ajax( {
		url: "/store/json/central_vidus.json",
		success: function( data ) {
			object = data;
			let files = object.file;
			N_FILE = files.length; // numero total de ficheros
			let all_element_last = files.length - 1;
			var i = 0;
			for ( i = lastElement; i < ( lastElement + quantity ) && ( i < N_FILE ); i++ ) {
				if ( i == ( ( lastElement + quantity ) - 1 ) ) isLastElement = true;
				show_content( files[ i ], isLastElement );
			}
			if ( i == N_FILE ) $( "#load-cont" ).addClass( "none" )
		}
	} );
}

function show_content( object, status ) {
	let isLastElement = status;
	let title = object.file;
	let file = object.filePath;
	let array_rute = new Array();
	array_rute = file.split( "/" );
	file = ""; // vaciar
	// último elemento (file)
	let last = array_rute.length - 1;
	/* TODO store in dinamic variable */
	let start_i = array_rute.indexOf( "store" );
	// Coger ruta para mostrar 
	for ( var i = start_i; i < ( last + 1 ); i++ ) file += `/${array_rute[ i ]}`;
	/* TODO dinamic variable */
	let screen = `/store/screen/${array_rute[ last ]}.jpg`;
	$( "#content" ).append( `
		<div class="post col-xl-4 col-md-6 col-sm-12 post-content">
			<div data-toggle="modal" data-target=".modales" class="image-content">
				<img src="${screen}" onclick="addVideoModal('${file}');">
				<span class="top-left">${title}</span>
			</div>
		</div>
		` );
	if ( isLastElement ) IS_RUNNING = false;
}
/**
 * (Deprecated) - pagination . sustituited by using semaphore
 */
function sleep( milliseconds ) {
	var start = new Date().getTime();
	for ( var i = 0; i < 1e7; i++ ) {
		if ( ( new Date().getTime() - start ) > milliseconds ) {
			break;
		}
	}
}