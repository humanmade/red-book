import React from 'react';

import './HeaderDropdown.css';

export default class HeaderDropdown extends React.Component {
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
		const { children, className, flip, title } = this.props;
		const { expanded } = this.state;

		const classes = [
			'HeaderDropdown',
			expanded ? 'expanded' : null,
			flip ? 'flip' : null,
			className,
		];

		return <div className={ classes.filter( c => !! c ).join( ' ' ) }>
			<button
				aria-expanded={ expanded }
				onClick={ this.onToggle }
				type="button"
			>
				{ title }
				<i className="icon icon--arrow-down icon--white" />
			</button>

			<ul>
				{ children }
			</ul>
		</div>;
	}
}

HeaderDropdown.defaultProps = {
	className: '',
	flip: false,
};
