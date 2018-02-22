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
		const { children, className, title } = this.props;
		const { expanded } = this.state;

		return <div className={ `HeaderDropdown ${ expanded ? 'expanded' : '' } ${ className || '' }` }>
			<button
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
