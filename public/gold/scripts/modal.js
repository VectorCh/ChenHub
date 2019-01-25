( function() {
    /**
     * Function of video in modal 
     */
    $( '#mod' ).on( 'shown.bs.modal', function() {
        $( '#crude' )[ 0 ].play();
        $( '#crude' )[ 0 ].volume = 0.2;
    } )
    $( '#mod' ).on( 'hide.bs.modal', function() {
        $( '#crude' )[ 0 ].pause();
    } )
    // $(".clk_img").addEventListener("click", displayDate);
} )();
/**
 * Add content modal
 * @param rute of file
 */
function addVideoModal( str ) {
    $( ".v_modal" ).remove(); // Borramos el contenido que había antes
    $( "#video_up" ).append( `
        <div class="v_modal">
            <video id="crude" controls="">
                <source src=" ${str} ">
                Your browser does not support HTML5 video.
                </source>
            </video>
        </div>
        ` );
}