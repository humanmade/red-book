import qs from 'qs';

export const LOAD_PAGE_REQUEST = 'LOAD_PAGE_REQUEST';
export const LOAD_PAGE = 'LOAD_PAGE';
export const LOAD_SEARCH_REQUEST = 'LOAD_SEARCH_REQUEST';
export const LOAD_SEARCH = 'LOAD_SEARCH';

const API_ROOT = window.RedBookData.api.replace( /\/$/, '' );
const API_NONCE = window.RedBookData.nonce;

export function loadPageByPath( path ) {
	return dispatch => {
		dispatch( { type: LOAD_PAGE_REQUEST, path } );

		const components = path.split( '/' );
		let url = `${ API_ROOT }/wp/v2/pages?slug=${ components[ components.length - 1 ] }`;

		if ( API_NONCE ) {
			url += `&_wpnonce=${ API_NONCE }`;
		}

		const options = {
			credentials: 'include',
		};

		fetch( url, options )
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

export function search( term ) {
	return dispatch => {
		dispatch( { type: LOAD_SEARCH_REQUEST, term } );

		const args = {
			search: term,
			orderby: 'relevance',
		}

		if ( API_NONCE ) {
			args._wpnonce = API_NONCE;
		}

		const url = `${ API_ROOT }/wp/v2/pages?${ qs.stringify( args ) }`;
		const options = {
			credentials: 'include',
		};

		fetch( url, options )
			.then( resp => resp.json() )
			.then( results => {
				dispatch( { type: LOAD_SEARCH, results, term } );
			} );
	};
};
