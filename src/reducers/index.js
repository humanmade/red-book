import { combineReducers } from 'redux';

import { pages } from '../types';
import sections from './sections';
import user from './user';

export default combineReducers( {
	pages: pages.reducer,
	sections,
	user,
} );
