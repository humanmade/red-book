import React from 'react';

import Logo from './Logo';
import Menu from './Menu';

import './Header.css';

const Header = ( { menu, searchTerm, user, onLogIn, onUpdateSearch } ) => <header className="Header">
	<div className="wrapper">
		<Logo />
		<h1>{ window.RedBookData.name }</h1>

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
					<li className="Header-user">
						<img
							alt=""
							src={ user.avatar_urls[24] }
						/>

						{ user.name }
					</li>
				:
					<li><a onClick={ onLogIn }>Log in</a></li>
				}
			</ul>
		</nav>
	</div>
</header>;

export default Header;
