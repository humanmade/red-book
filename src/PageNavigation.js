import React from 'react';

import Link from './Link';

import './PageNavigation.css';

const PageNavigation = props => <footer className="PageNavigation">
	{ props.previous ?
		<div>
			<span className="PageNavigation-arrow">←</span>
			<Link href={ props.previous.href }>
				{ props.previous.title }
			</Link>
		</div>
	:
		<div />
	}

	{ props.next ?
		<div>
			<Link href={ props.next.href }>
				{ props.next.title }
			</Link>
			<span className="PageNavigation-arrow">→</span>
		</div>
	: null }
</footer>;

export default PageNavigation;
