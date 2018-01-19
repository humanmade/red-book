import React from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Main from '../Main';
import { loadPageByPath } from '../actions';

class Page extends React.Component {
	componentDidMount() {
		if ( ! this.props.post ) {
			this.props.onLoad();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.post && prevProps.path !== this.props.path ) {
			this.props.onLoad();
		}
	}

	render() {
		const { post } = this.props;

		if ( ! post ) {
			return <Loading />;
		}

		return <Main
			page={ post }
		/>;
	}
}

const mapStateToProps = ( state, props ) => {
	const expected = ( [ window.RedBookData.home, props.path ].join( '/' ) + '/' ).replace( /\/+$/, '/' );

	return {
		post: Object.values( state.pages ).find( page => page.link === expected ),
	};
};

const mapDispatchToProps = ( dispatch, props ) => {
	return {
		onLoad() {
			dispatch( loadPageByPath( props.path ) );
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Page );
