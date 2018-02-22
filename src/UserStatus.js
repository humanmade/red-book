import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from './actions';
import HeaderDropdown from './HeaderDropdown';

import './UserStatus.css';

const UserStatus = props => {
	const { user, onLogOut } = props;

	if ( ! user ) {
		return <li><Link to="/login">Log in</Link></li>;
	}

	return <li className="UserStatus">
		<HeaderDropdown
			flip
			title={ <React.Fragment>
				<img
					alt=""
					src={ user.avatar_urls[24] }
				/>

				{ user.name }
			</React.Fragment> }
		>
			<li>
				<a
					href={ window.RedBookData.home + `/wp-login.php?action=logout` }
					onClick={ onLogOut }
				>
					Log out
				</a>
			</li>
		</HeaderDropdown>
	</li>;
}

const mapStateToProps = () => ( {} );

const mapDispatchToProps = dispatch => {
	return {
		onLogOut: () => dispatch( logOut() ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( UserStatus );
