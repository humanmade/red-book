import React from 'react';

import Content from './Content';
import Footer from './containers/Footer';
import Sidebar from './Sidebar';

import './Main.css';

const Main = ( { page } ) => <div className="Main">
	<div className="Main-content">
		<Content
			key={ page.ID }
			content={ `<h1>${ page.title.rendered }</h1>\n${ page.content.rendered }` }
		/>

		<Footer
			page={ page }
		/>
	</div>

	<Sidebar
		contents={ page.contents || [] }
	/>
</div>;

export default Main;
