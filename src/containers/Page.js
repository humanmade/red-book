import { withArchive } from '@humanmade/repress';

import { pages } from '../types';
import Main from '../Main';

export default withArchive(
	pages,
	state => state.pages,
	props => pages.idForPath( props.path )
)( Main );
