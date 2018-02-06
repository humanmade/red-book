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
	pages.registerArchive( normalized, {
		slug: components.slice( -1 )[0],
	} );
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
pages.getPageByPath = ( state, path ) => {
	const normalized = normalizePath( path );
	const allMatching = pages.getArchive( state.pages, normalized );
	if ( ! allMatching ) {
		return null;
	}

	// Whittle down to the only one that matches fully.
	return allMatching.find( page => pathForPage( page ) === normalized );
};
