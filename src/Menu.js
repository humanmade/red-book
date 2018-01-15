import React from 'react';

import Link from './Link';

/*const ReadIndicator = ( { item } ) => {
	if ( item.title.indexOf( 'e' ) >= 0 ) {
		return <span className="ReadIndicator">✔</span>
	}

	return null;
};*/

const Menu = props => {
	if ( ! props.items ) {
		return null;
	}

	return <ul>
		{ props.items.map( ( item, idx ) => <li key={ item.id || `idx-${ idx }` }>
			{ item.href ?
				<Link href={ item.href }>
					{ item.title }
				</Link>
			:
				<span>
					{ item.title }
				</span>
			}

			{ 'items' in item && item.items.length > 0 ?
				<Menu
					items={ item.items }
				/>
			: null }
		</li> ) }
	</ul>;
};

export default Menu;
