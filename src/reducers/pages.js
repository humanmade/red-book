import { LOAD_PAGE } from '../actions';

export default function pages( state = [], action ) {
	switch ( action.type ) {
		case LOAD_PAGE:
			return [
				...state,
				action.page,
			];

		default:
			return state;
	}
}
