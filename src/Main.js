import React from 'react';

import Content from './Content';
import PageNavigation from './containers/PageNavigation';
import Sidebar from './Sidebar';

import './Main.css';

const Main = ( { page } ) => <div className="Main">
	<div className="Main-content">
		<Content
			key={ page.ID }
			content={ `<h1>${ page.title.rendered }</h1>\n${ page.content.rendered }` }
		/>

		<PageNavigation
			page={ page }
		/>
	</div>

	<Sidebar
		page={ page }
	/>
</div>;

export default Main;
