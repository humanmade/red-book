import { combineReducers } from 'redux';

import { pages } from '../types';
import sections from './sections';

export default combineReducers( {
	pages: pages.reducer,
	sections,
} );
