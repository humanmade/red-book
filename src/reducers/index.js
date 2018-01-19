import { combineReducers } from 'redux';

import pages from './pages';
import search from './search';
import sections from './sections';

export default combineReducers( {
	pages,
	search,
	sections,
} );
