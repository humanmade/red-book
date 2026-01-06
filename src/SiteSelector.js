import React from 'react';

import HeaderDropdown from './HeaderDropdown';

import './SiteSelector.css';

export default function SiteSelector( props ) {
	const { children, user } = props;

	return <HeaderDropdown
		className="SiteSelector"
		title={ React.Children.only( children ) }
	>
		<li>
			<a href="https://humanmade.com/blog/">
				<span>Blog</span>
				All the latest from Human Made.
			</a>
		</li>
		<li>
			<a href="https://handbook.hmn.md/">
				<span>Handbook</span>
				Read about how we work as a company.
			</a>
		</li>

		{ user ?
			<React.Fragment>
				<li className="SiteSelector-separator SiteSelector-internal">
					Internal Sites
				</li>
				<li className="SiteSelector-internal">
					<a href="https://updates.hmn.md/">
						<span>Updates</span>
						Main H2 for all the goings-on.
					</a>
				</li>
				<li className="SiteSelector-internal">
					<a href="https://dev.hmn.md/">
						<span>Dev</span>
						Development related discussion.
					</a>
				</li>
				<li className="SiteSelector-internal">
					<a href="https://servers.hmn.md/">
						<span>Servers</span>
						Hosting and server related discussion.
					</a>
				</li>
				<li className="SiteSelector-internal">
					<a href="https://hub.hmn.md/">
						<span>Hub</span>
						Central area for everything else.
					</a>
				</li>
			</React.Fragment>
		: null }
	</HeaderDropdown>;
}
