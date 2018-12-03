import React from 'react';

import NavMenu from './NavMenu';

import './Navigation.css';

export default class Navigation extends React.Component {
	state = {
		expanded: false,
	}

	render() {
		const { sections } = this.props;

		const className = `Navigation ${ this.state.expanded ? 'Navigation--expanded' : '' }`;

		return (
			<nav aria-label="Primary" className={ className }>
				<button
					className="Navigation__toggle btn btn--primary"
					type="button"
					onClick={ () => this.setState( state => ( { expanded: ! state.expanded } ) ) }
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
}
