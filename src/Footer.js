import React from 'react';

import Logo from './Logo';
import NavMenu from './NavMenu';

import './Footer.css';

const HANDBOOK_LINKS = [
	{
		href: "https://handbook.hmn.md/",
		title: "Staff Handbook",
	},
	{
		href: "https://pm.hmn.md/",
		title: "Project Management Handbook",
	},
];

const DOCS = [
	{
		href: "https://docs.aws.hmn.md/",
		title: "Platform",
	},
];

export default function Footer( props ) {
	return <footer class="Footer">
		<div class="wrapper">
			<div>
				<Logo />
				<p>Created with <span class="Footer-heart">&hearts;</span> just for you.</p>
				<p>Reuse these docs under a <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.</p>
			</div>
			<NavMenu
				items={ HANDBOOK_LINKS }
				title="Handbooks"
			/>
			<NavMenu
				items={ DOCS }
				title="Documentation"
			/>
		</div>
	</footer>;
}
