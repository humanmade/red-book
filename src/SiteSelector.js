import React from 'react';

import Logo from './Logo';

import './SiteSelector.css';

export default class SiteSelector extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			expanded: false,
		};
	}

	onToggle = () => {
		this.setState( state => ( { expanded: ! state.expanded } ) );
	}

	render() {
		const { expanded } = this.state;

		return <div className={ `SiteSelector ${ expanded ? 'expanded' : '' }` }>
			<button
				onClick={ this.onToggle }
				type="button"
			>
				<h1>{ window.RedBookData.name }</h1>
				<i className="icon icon--arrow-down icon--white" />
			</button>

			<ul>
				<li>
					<a href="https://humanmade.com/blog/">
						<span>Blog</span>
						All the latest from Human Made.
					</a>
				</li>
				<li>
					<a href="https://handbook.hmn.md/">
						<span>Handbook</span>
						Read about how we work as a company.
					</a>
				</li>
				<li>
					<a href="https://pm.hmn.md/">
						<span>Project Management Handbook</span>
						Read how we manage projects.
					</a>
				</li>
			</ul>
		</div>;
	}
}
