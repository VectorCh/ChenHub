/** (Deprecated) - Pagination
 * Renderiza la barra de páginas
 * @param número de páginas totales a mostrar
 * @param selected número seleccionado
 */
function nav_page( value, selected ) {
	for ( var i = 1; i < ( value + 1 ); i++ ) {
		if ( ( selected == 0 && i == 1 ) || selected == i ) {
			str = `class="page btn btn-secondary"`;
		} else {
			str = `class="page btn btn-light" onclick="_beta(` + i + `);"`;
		}
		$( "#pagination .mid" ).append( `<button type="button" ${str} > ${i} </button>` );
	}
}
/** (Deprecated) - Pagination
 * Calcula el número total de páginas
 * @param value número de elementos totales (en todas las páginas)
 * @return número de páginas 
 */
function numberOfPage( value ) {
	value = ( value > CONTENT_PAGE ) ? ( value / CONTENT_PAGE ) : ( 1 );
	return ( ( ( value ) % 1 != 0 ) ? ( Math.ceil( value ) ) : ( value ) )
}
/* * * *  Inifnity scroll  * * * */
/**
 * Calcula si el elemento está o no mostrádose en la pantalla
 * @return true está en la pantalla, else viceversa 
 */
$.fn.isInViewport = function() {
	var elementTop = $( this ).offset().top;
	var elementBottom = elementTop + $( this ).outerHeight();
	var viewportTop = $( window ).scrollTop();
	var viewportBottom = viewportTop + $( window ).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};
/**
 * Se encarga de cargar nuevo contenido si se hace scroll(down)
 */
$( window ).on( 'resize scroll', function() {
	// exit if ajax is running
	if ( IS_RUNNING ) return;
	IS_RUNNING = true;
	// TODO: check if page full loaded stop
	if ( $( "#load-cont" ).isInViewport() ) { //load new content
		// 	1. Check last element loaded
		let lastElement = number_elements( document.getElementById( 'content' ), false );
		// 	2. Load new content (last_element, + numberNewContent)
		render_beta( lastElement, 30 );
		// [✓] TODO: search more (using semaphore)
		// sleep( 600 );
	} else {
		IS_RUNNING = false;
	}
} );
/** 
 * Check number of elements 
 * @param parent ID of element 
 * @param true (son of son) or false (only son)
 * @return número de hijos en la página
 */
function number_elements( parent, getChildrensChildren ) {
	var relevantChildren = 0;
	var children = parent.childNodes.length;
	for ( var i = 0; i < children; i++ ) {
		if ( parent.childNodes[ i ].nodeType != 3 ) {
			if ( getChildrensChildren ) relevantChildren += getCount( parent.childNodes[ i ], true );
			relevantChildren++;
		}
	}
	return relevantChildren;
}