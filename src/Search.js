import React from 'react';

import Link from './Link';

import './Search.css';

export default function Search( props ) {
	return <ol className="Search">
		{ props.results.map( result =>
			<li key={ result.id } className="markdown-body">
				<h2><Link href={ result.link }>{ result.title.rendered }</Link></h2>
				<div
					dangerouslySetInnerHTML={ { __html: result.excerpt.rendered } }
				/>
			</li>
		) }
	</ol>;
}