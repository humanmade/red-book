import React from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import SearchComponent from '../Search';
import { search } from '../actions';

class Search extends React.Component {
	componentDidMount() {
		if ( ! this.props.results ) {
			this.props.onLoad();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.term !== this.props.term ) {
			this.props.onLoad();
		}
	}

	render() {
		const { results } = this.props;

		if ( ! results ) {
			return <Loading />;
		}

		return <SearchComponent results={ results } />;
	}
}

const mapStateToProps = ( state, props ) => {
	return {
		results: state.search.results,
		// term:    state.search.term,
	};
};

const mapDispatchToProps = ( dispatch, props ) => {
	return {
		onLoad() {
			dispatch( search( props.term ) );
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Search );
