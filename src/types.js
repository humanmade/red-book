import { handler } from '@humanmade/repress';

export const pages = new handler( {
	type:  'pages',
	url:   `${ window.RedBookData.api }wp/v2/pages`,
	nonce: window.RedBookData.nonce,
} );

const normalizePath = path => path.replace( /^\/+|\/+$/g, '' );
pages.idForPath = path => {
	// Query by slug for the final path component.
	const normalized = normalizePath( path );
	const components = normalized.split( '/' );
	if ( normalized === '' ) {
		pages.registerArchive( normalized, {
			include: window.RedBookData.home_page.id,
		} );
	} else {
		pages.registerArchive( normalized, {
			slug: components.slice( -1 )[0],
		} );
	}
	return normalized;
};

pages.idForSearch = term => {
	pages.registerArchive( `search/${ term }`, {
		search: term,
		orderby: 'relevance',
	} );
	return `search/${ term }`;
};

const pathForPage = page => normalizePath( page.link.substr( window.RedBookData.home.length ) );
// Whittle down to the only page that matches fully.
pages.findPage = ( pages, path ) => {
	const normalized = normalizePath( path );
	return pages.find( page => pathForPage( page ) === normalized );
};
