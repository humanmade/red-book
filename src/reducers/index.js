import { combineReducers } from 'redux';

import pages from './pages';
import sections from './sections';

export default combineReducers( {
	pages,
	sections,
} );
