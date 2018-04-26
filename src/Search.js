import React from 'react';

import Link from './Link';
import Loading from './Loading';

import './Search.css';

export default function Search( props ) {
	if ( props.loading ) {
		return <main className="Search markdown-body" id={ props.id || null }>
			<Loading />
			<p aria-atomic="true" aria-live="polite" className="screen-reader-text" />
		</main>;
	}

	if ( ! props.posts || ! props.posts.length ) {
		return <main className="Search markdown-body" id={ props.id || null }>
			<h1>Search Results</h1>
			<p aria-atomic="true" aria-live="polite">
				No results found
			</p>
		</main>;
	}

	return <main className="Search markdown-body" id={ props.id || null }>
		<h1>Search Results</h1>
		<p aria-atomic="true" aria-live="polite" className="screen-reader-text">
			{ props.posts.length === 1 ? `1 result` : `${ props.posts.length } results` }
		</p>
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
