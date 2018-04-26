import React from 'react';

import Logo from './Logo';
import NavMenu from './NavMenu';

import './Footer.css';

export default function Footer( props ) {
	return <footer className="Footer" role="contentinfo">
		<div className="wrapper">
			<div>
				<Logo />
				<p>Created with <span className="Footer-heart">&hearts;</span> just for you.</p>
				<p>Reuse these docs under a <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.</p>
			</div>
			<NavMenu
				items={ props.handbooks }
				title="Handbooks"
			/>
			<NavMenu
				items={ props.documentation }
				title="Documentation"
			/>
		</div>
	</footer>;
}
