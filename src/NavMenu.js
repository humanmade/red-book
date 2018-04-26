import React from 'react';

import Link from './Link';
import Menu from './Menu';

import './NavMenu.css';

const NavMenu = ( { href, items, title } ) => <nav className="NavMenu">
	{ title ? (
		href ? (
			<p className="NavMenu-title has-link"><Link href={ href }>{ title }</Link></p>
		) : (
			<p className="NavMenu-title">{ title }</p>
		)
	) : null }
	<Menu items={ items } />
</nav>;

NavMenu.defaultProps = {
	title: null,
};

export default NavMenu;
