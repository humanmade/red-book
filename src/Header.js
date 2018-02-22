import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import SiteSelector from './SiteSelector';
import Menu from './Menu';

import './Header.css';

const Header = ( { menu, searchTerm, user, onUpdateSearch } ) => <header className="Header">
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
					<li className="Header-user">
						<img
							alt=""
							src={ user.avatar_urls[24] }
						/>

						{ user.name }
					</li>
				:
					<li><Link to="/login">Log in</Link></li>
				}
			</ul>
		</nav>
	</div>
</header>;

const mapStateToProps = state => ( { user: state.user && state.user.data } );

export default connect(
	mapStateToProps
)( Header );
