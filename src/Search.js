import React from 'react';

import Link from './Link';
import Loading from './Loading';

import './Search.css';

export default function Search( props ) {
	if ( props.loading ) {
		return <Loading />;
	}

	if ( ! props.posts || ! props.posts.length ) {
		return <main className="Search markdown-body">
			<h1>Search Results</h1>
			<p>No results found</p>
		</main>;
	}

	return <main className="Search markdown-body">
		<h1>Search Results</h1>
		<ol>
			{ props.posts.map( result =>
				<li key={ result.id }>
					<h2><Link href={ result.link }>{ result.title.rendered }</Link></h2>
					<div
						dangerouslySetInnerHTML={ { __html: result.excerpt.rendered } }
					/>
				</li>
			) }
		</ol>
	</main>;
}
