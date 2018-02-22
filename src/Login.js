import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { logIn } from './actions'
import PageTitle from './PageTitle';

import './Login.css';

class Login extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			username: '',
			password: '',
			remember: false,
		};
	}

	onLogIn = e => {
		e.preventDefault();

		const { password, remember, username } = this.state;
		this.props.onLogIn( username, password, remember );
	}

	render() {
		if ( this.props.user ) {
			return <Redirect to="/" />;
		}

		return <PageTitle title="Log In">
			<div className="Login">
				<h1>Log In</h1>
				<form onSubmit={ this.onLogIn }>
					<div>
						<label>Username</label>
						<div>
							<input
								type="text"
								value={ this.state.username }
								onChange={ e => this.setState( { username: e.target.value } ) }
							/>
						</div>
					</div>
					<div>
						<label>Password</label>
						<div>
							<input
								type="password"
								value={ this.state.password }
								onChange={ e => this.setState( { password: e.target.value } ) }
							/>
						</div>
					</div>
					<div>
						<label>Remember me?</label>
						<div>
							<input
								checked={ this.state.remember }
								type="checkbox"
								onChange={ e => this.setState( { remember: e.target.checked } ) }
							/>
						</div>
					</div>
					<button className="btn" type="submit">Log In</button>
				</form>
			</div>
		</PageTitle>;
	}
};

const mapStateToProps = state => {
	return {
		user: state.user.data,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogIn: ( ...args ) => dispatch( logIn( ...args ) ),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Login );
