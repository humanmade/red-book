import React from 'react';

import NavMenu from './NavMenu';

import './Sidebar.css';

const Sidebar = ( { contents } ) => <div className="Sidebar">
	<NavMenu
		items={ [
			{
				title: 'Edit this page',
				href: '#',
			}
		] }
	/>
	{ contents && contents.length ?
		<NavMenu
			items={ contents || [] }
			title="Contents"
		/>
	: null }
</div>;

export default Sidebar;