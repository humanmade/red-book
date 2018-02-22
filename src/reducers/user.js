import {
	LOG_IN_REQUEST,
	LOG_IN,
	LOG_IN_ERROR,
	LOG_OUT_REQUEST,
	LOG_OUT,
	LOG_OUT_ERROR,
} from '../actions';

const DEFAULT_STATE = {
	data: null,
	nonce: null,
	loading: false,
};

export default function user( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case LOG_IN:
			return {
				...state,
				data: action.user,
				loading: false,
				nonce: action.nonce,
			};

		case LOG_OUT:
			return {
				...state,
				data: null,
				loading: false,
				nonce: null,
			};

		case LOG_IN_REQUEST:
		case LOG_OUT_REQUEST:
			return {
				...state,
				loading: true,
			};

		case LOG_IN_ERROR:
		case LOG_OUT_ERROR:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
}
