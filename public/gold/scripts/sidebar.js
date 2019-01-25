/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById( "mySidenav" ).style.width = "250px";
}
/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById( "mySidenav" ).style.width = "0";
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
			console.log( `La solicitud a fallado: ${textStatus}`);
		}
	} );
}

function scanner() {
	$.ajax( {
		url: "http://146.158.207.81:777/scan?dir=C:\\Users\\Yang Chen\\Documents\\Rep0\\maintest\\store\\video",
	} ).done( function( data, textStatus, jqXHR ) {
		console.log("Scanned")
	} ).fail( function( jqXHR, textStatus, errorThrown ) {
		if ( console && console.log ) {
			console.log( `La solicitud a fallado: ${textStatus}`);
		}
	} );
}