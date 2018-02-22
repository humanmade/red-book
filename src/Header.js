import React from 'react';

import Logo from './Logo';
import SiteSelector from './SiteSelector';
import Menu from './Menu';

import './Header.css';

const Header = ( { menu, searchTerm, user, onLogIn, onUpdateSearch } ) => <header className="Header">
	<div className="wrapper">
		<Logo />
		<SiteSelector
			user={ user }
		/>

		<nav className="Header-nav-main">
			<Menu
				items={ menu }
			/>
		</nav>

		<nav>
			<ul>
				<li>
					<input
						type="search"
						placeholder="Search…"
						value={ searchTerm }
						onChange={ e => onUpdateSearch( e.target.value ) }
					/>
				</li>

				{ user ?
					<li>Logged in as Ryan</li>
				:
					<li><a onClick={ onLogIn }>Log in</a></li>
				}
			</ul>
		</nav>
	</div>
</header>;

export default Header;
