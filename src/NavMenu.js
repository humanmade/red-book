import React from 'react';

import Link from './Link';
import Menu from './Menu';

import './NavMenu.css';

const NavMenu = ( { href, items, title } ) => <nav className="NavMenu">
	{ title ? (
		href ? (
			<h3 className="has-link"><Link href={ href }>{ title }</Link></h3>
		) : (
			<h3>{ title }</h3>
		)
	) : null }
	<Menu items={ items } />
</nav>;

NavMenu.defaultProps = {
	title: null,
};

export default NavMenu;
