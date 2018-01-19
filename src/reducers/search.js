import { LOAD_SEARCH_REQUEST, LOAD_SEARCH } from '../actions';

export default function search( state = {}, action ) {
	switch ( action.type ) {
		case LOAD_SEARCH_REQUEST: {
			return {
				...state,
				results: [],
				term: action.term,
			};
		}
		case LOAD_SEARCH: {
			return {
				...state,
				results: action.results,
				term: action.term,
			};
		}

		default:
			return state;
	}
}
