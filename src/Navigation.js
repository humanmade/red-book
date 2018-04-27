import React from 'react';

import NavMenu from './NavMenu';

import './Navigation.css';

const Navigation = ( { sections } ) => <nav aria-label="Primary" className="Navigation">
	{ sections.map( ( section, idx ) =>
		<NavMenu
			key={ idx }
			href={ section.href || null }
			items={ section.items }
			title={ section.title }
		/>
	) }
</nav>;

export default Navigation;
