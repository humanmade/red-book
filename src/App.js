import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import Page from './containers/Page';
import Search from './containers/Search';

import './App.css';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			searchTerm: '',
			user: null,
		};
	}

	render() {
		const { menus, sections } = this.props;
		const { searchTerm } = this.state;

		return <div className="App">
			<Header
				menu={ menus.primary }
				searchTerm={ searchTerm }
				user={ this.state.user }
				onLogIn={ () => this.setState( { user: true } ) }
				onUpdateSearch={ term => this.setState( { searchTerm: term } ) }
			/>

			<div className="App-main wrapper">
				<Navigation
					sections={ sections }
				/>

				{ searchTerm ?
					<Search term={ searchTerm } />
				:
					<Switch>

						{/* Page Fallback */}
						<Route path="/:path+" render={ props =>
							<Page
								path={ props.match.params.path }
							/>
						} />

						<Route exact path="/" render={ props =>
							<Page
								path="/"
							/>
						} />

					</Switch>
				}
			</div>

			<Footer />
		</div>;
	}
}

export default App;
