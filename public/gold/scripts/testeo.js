( function() {
	render();
} )();

function render() {

	$.ajax( {
		url: "/store/json/files_vidus_ssd.json",
		success: function( result ) {
			N_FILE = result.info.n_file;
			object = result;
			let category = result.files[0].folder[0][1].name;
			console.log(N_FILE)
			console.log(object)
			console.log(category)
			searchAllElement(1, 'porn', result);
		}
	} );
}

/**
 * Search all element with a expecific category (category = folder name)
 * Only work for a equal depth...
 */
function searchAllElement(depth, category, allElement) {
	console.log("Searching...")
	let folder_name = null;
	let element = null;
	let object = allElement;
	for (var i = 0; i < N_FILE; i++) {
		folder_name = object.files[i].folder[0][depth].name; 
		console.log(folder_name)
		if ( category === folder_name )
		{
			element = object.files[i].file;
			console.warn(element);
		}
	}
} 

function allCategory() {
	
}