import { connect } from 'react-redux';

import PageNavigation from '../PageNavigation';

// Do the walk of love.
const walk = list => {
	const items = [];
	list.forEach( item => {
		items.push( item );
		if ( item.items ) {
			items.push( ...walk( item.items ) );
		}
	} );
	return items;
}
const findPreviousNext = ( menu, page ) => {
	const traversed = walk( menu );
	const index = traversed.findIndex( item => item.id === page.id );

	const previous = traversed[ index - 1 ] || null;
	const next = traversed[ index + 1 ] || null;
	return [ previous, next ];
};

const mapStateToProps = ( state, props ) => {
	const [ previous, next ] = findPreviousNext( state.sections, props.page );
	return {
		previous,
		next
	};
};

export default connect( mapStateToProps )( PageNavigation );
