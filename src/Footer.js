import React from 'react';

import Link from './Link';

import './Footer.css';

const Footer = props => <footer className="Footer">
	{ props.previous ?
		<div>
			<span className="Footer-arrow">←</span>
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
			<span className="Footer-arrow">→</span>
		</div>
	: null }
</footer>;

export default Footer;
