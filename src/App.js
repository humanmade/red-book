import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';
import Login from './Login';
import Page from './containers/Page';
import Search from './containers/Search';

import './App.css';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			searchTerm: '',
		};
		this.mainContainer = null;
	}

	componentWillMount() {
		this.unsubscribeFromHistory = this.props.history.listen( loc => this.handleLocationChange( loc ) );
	}

	componentWillUnmount() {
		if ( this.unsubscribeFromHistory ) {
			this.unsubscribeFromHistory();
		}
	}

	handleLocationChange( location ) {
		if ( this.state.searchTerm ) {
			this.setState( { searchTerm: '' } );
		}

		// Scroll main to the top, if we can.
		if ( this.mainContainer ) {
			this.mainContainer.scrollIntoView( true );
		}
	}

	render() {
		const { menus, sections } = this.props;
		const { searchTerm } = this.state;
		const { user } = window.RedBookData;

		return <div className="App">
			<Header
				menu={ menus.primary }
				searchTerm={ searchTerm }
				onUpdateSearch={ term => this.setState( { searchTerm: term } ) }
			/>

			<div className="App-main wrapper" ref={ ref => this.mainContainer = ref }>
				<Navigation
					sections={ sections }
				/>

				{ searchTerm ?
					<Search term={ searchTerm } />
				:
					<Switch>
						<Route
							component={ Login }
							path="/login"
						/>

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
