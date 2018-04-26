import React from 'react';

import NavMenu from './NavMenu';

import './Sidebar.css';

const Sidebar = ( { page } ) => {
	const links = [];
	if ( page._links['redbook:edit'] ) {
		links.push( {
			title: 'Edit this page',
			href: page._links['redbook:edit'][0].href,
		} );
	}

	return <aside className="Sidebar">
		<NavMenu
			items={ links }
		/>
		{ page.contents && page.contents.length ?
			<nav aria-label="In-Page">
				<NavMenu
					items={ page.contents }
					title="Contents"
				/>
			</nav>
		: null }
	</aside>;
};

export default Sidebar;