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

	return <div className="Sidebar">
		<NavMenu
			items={ links }
		/>
		{ page.contents && page.contents.length ?
			<NavMenu
				items={ page.contents }
				title="Contents"
			/>
		: null }
	</div>;
};

export default Sidebar;