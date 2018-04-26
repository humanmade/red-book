import React from 'react';

import Content from './Content';
import PageNavigation from './containers/PageNavigation';
import Loading from './Loading';
import PageTitle from './PageTitle';
import Sidebar from './Sidebar';
import { pages } from './types';

import './Main.css';

const Main = ( { loading, path, posts } ) => {
	if ( loading ) {
		return <Loading />;
	}

	if ( ! posts || ! posts.length ) {
		return <div className="Main">
			<div className="Main-content">
				<h1>Not Found</h1>
			</div>
		</div>;
	}

	const page = pages.findPage( posts, path );
	return <PageTitle title={ page.title.rendered }>
		<main className="Main">
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
		</main>
	</PageTitle>;
}

export default Main;
