//Ruta del contenido (vidus)
const VIDU_ROUTE = "E:\\( asunto )\\[ chenHub-produc ]\\store\\video";
var IS_SHOW = false;
( function() {
	$( "#content" ).click( function(e) {
		if ( IS_SHOW ) {
			e.stopPropagation();
			closeNav();
		}
	} );
} )();
/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById( "mySidenav" ).style.width = "250px";
	$( "#image-logo" ).addClass( "proto_content" ); // Creamos área
	IS_SHOW = true;
}
/* Set the width of the side navigation to 0 */
function closeNav() {
	$( "#image-logo" ).removeClass( "proto_content" );
	document.getElementById( "mySidenav" ).style.width = "0";
	IS_SHOW = false;
}

function getFolder() {
	$.ajax( {
		url: "/store/json/category.json",
	} ).done( function( data, textStatus, jqXHR ) {
		$( ".pr_category" ).remove();
		let category = data.category;
		let n_primary_category = category.length;
		for ( var i = 0; i < n_primary_category; i++ ) {
			if ( ( i == 0 ) || ( category[ i - 1 ][ 0 ] != category[ i ][ 0 ] ) ) {
				// Mostrar 
				// TODO: Call a function, and the function usin route and wait the response
				$( "#side_folder" ).append( `<a class="pr_category" href="/cat/${category[ i ][ 0 ]}"> ${category[ i ][ 0 ]} </a>` );
			}
		}
	} ).fail( function( jqXHR, textStatus, errorThrown ) {
		if ( console && console.log ) {
			console.log( `La solicitud a fallado: ${textStatus}` );
		}
	} );
}

function scanner() {
	$.ajax( {
		url: `http://146.158.207.81:777/scan?dir=${VIDU_ROUTE}`,
	} ).done( function( data, textStatus, jqXHR ) {
		location.reload();
	} ).fail( function( jqXHR, textStatus, errorThrown ) {
		if ( console && console.log ) {
			console.log( `La solicitud a fallado: ${textStatus}` );
		}
	} );
}