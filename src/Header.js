import React from 'react';

import Logo from './Logo';
import Menu from './Menu';

import './Header.css';

const Header = ( { menu, user, onLogIn } ) => <header className="Header">
	<div className="wrapper">
		<Logo />
		<h1>Engineering</h1>

		<nav className="Header-nav-main">
			<Menu
				items={ menu }
			/>
		</nav>

		<nav>
			<ul>
				<li>
					<input type="search" placeholder="Search…" />
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
