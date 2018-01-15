export const LOAD_PAGE_REQUEST = 'LOAD_PAGE_REQUEST';
export const LOAD_PAGE = 'LOAD_PAGE';

const API_ROOT = window.RedBookData.api.replace( /\/$/, '' );

export function loadPageByPath( path ) {
	return dispatch => {
		dispatch( { type: LOAD_PAGE_REQUEST, path } );

		const components = path.split( '/' );
		const url = `${ API_ROOT }/wp/v2/pages?slug=${ components[ components.length - 1 ] }`;

		fetch( url )
			.then( resp => resp.json() )
			.then( data => {
				const expected = ( [ window.RedBookData.home, path ].join( '/' ) + '/' ).replace( /\/+$/, '/' );
				const page = data.find( page => page.link === expected );

				console.log( expected );
				console.log( url );

				if ( ! page ) {
					throw new Error( 'Could not find page.' );
				}

				dispatch( { type: LOAD_PAGE, page } );
			} );
	};
};
