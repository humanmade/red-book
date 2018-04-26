import React from 'react';

import Link from './Link';
import Menu from './Menu';

import './NavMenu.css';

const NavMenu = ( { href, items, title } ) => <div className="NavMenu">
	{ title ? (
		href ? (
			<p className="NavMenu-title has-link"><Link href={ href }>{ title }</Link></p>
		) : (
			<p className="NavMenu-title">{ title }</p>
		)
	) : null }
	<Menu items={ items } />
</div>;

NavMenu.defaultProps = {
	title: null,
};

export default NavMenu;
