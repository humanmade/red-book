import React from 'react';

import NavMenu from './NavMenu';

import './Navigation.css';

export default function Navigation( props ) {
	const { expanded, sections, onToggle } = props;

	const className = `Navigation ${ expanded ? 'Navigation--expanded' : '' }`;

	return (
		<nav aria-label="Primary" className={ className }>
			<button
				className="Navigation__toggle btn btn--primary"
				type="button"
				onClick={ onToggle }
			>
				Toggle Navigation
			</button>

			{ sections.map( ( section, idx ) =>
				<NavMenu
					key={ idx }
					href={ section.href || null }
					items={ section.items }
					title={ section.title }
				/>
			) }
		</nav>
	);
}
