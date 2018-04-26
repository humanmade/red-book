import React from 'react';
import { connect } from 'react-redux';

import Logo from './Logo';
import SiteSelector from './SiteSelector';
import UserStatus from './UserStatus';
import Menu from './Menu';

import './Header.css';

const Header = ( { menu, searchTerm, user, onUpdateSearch } ) => <header className="Header">
	<div className="wrapper">
		<Logo />
		<SiteSelector
			user={ user }
		>
			<h1>{ window.RedBookData.name }</h1>
		</SiteSelector>

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

				<UserStatus
					user={ user }
				/>
			</ul>
		</nav>
	</div>
</header>;

const mapStateToProps = state => ( { user: state.user && state.user.data } );

export default connect(
	mapStateToProps
)( Header );
