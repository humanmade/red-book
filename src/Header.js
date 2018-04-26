import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import SiteSelector from './SiteSelector';
import UserStatus from './UserStatus';
import Menu from './Menu';

import './Header.css';

const Header = ( { menu, searchTerm, user, onUpdateSearch } ) => <header className="Header">
	<div className="wrapper">
		<Link className="Header-logo-link" to="/">
			<Logo />
		</Link>

		<SiteSelector
			user={ user }
		>
			<span className="Header-title">{ window.RedBookData.name }</span>
		</SiteSelector>

		<nav aria-label="External" className="Header-nav Header-nav-main">
			<Menu
				items={ menu }
			/>
		</nav>

		<div className="Header-nav">
			<ul>
				<li>
					<label>
						<span className="screen-reader-text">Search:</span>
						<input
							type="search"
							placeholder="Search…"
							value={ searchTerm }
							onChange={ e => onUpdateSearch( e.target.value ) }
						/>
					</label>
				</li>

				{ searchTerm ? (
					<li className="Header-search-skip-wrap">
						<a className="Header-search-skip screen-reader-text" href="#content">Skip to results</a>
					</li>
				) : null }

				<UserStatus
					user={ user }
				/>
			</ul>
		</div>
	</div>
</header>;

const mapStateToProps = state => ( { user: state.user && state.user.data } );

export default connect(
	mapStateToProps
)( Header );
