import { withArchive } from '@humanmade/repress';

import { pages } from '../types';
import SearchComponent from '../Search';

export default withArchive(
	pages,
	state => state.pages,
	props => pages.idForSearch( props.term )
)( SearchComponent );
