import React from 'react';

import Link from './Link';
import Loading from './Loading';

import './Search.css';

export default function Search( props ) {
	if ( props.loading ) {
		return <Loading />;
	}

	if ( ! props.posts ) {
		return <div>No results found</div>;
	}

	return <ol className="Search markdown-body">
		<h1>Search Results</h1>
		{ props.posts.map( result =>
			<li key={ result.id }>
				<h2><Link href={ result.link }>{ result.title.rendered }</Link></h2>
				<div
					dangerouslySetInnerHTML={ { __html: result.excerpt.rendered } }
				/>
			</li>
		) }
	</ol>;
}