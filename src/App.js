import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import HomeHero from './HomeHero';
import Navigation from './Navigation';
import Login from './Login';
import Page from './containers/Page';
import Search from './containers/Search';

import './App.css';

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			expandedNavigation: false,
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
		// Don't change on in-page navigation.
		if ( location.pathname === this.props.location.pathname && location.search === this.props.location.search ) {
			return;
		}

		if ( this.state.searchTerm ) {
			this.setState( { searchTerm: '' } );
		}
		if ( this.state.expandedNavigation ) {
			this.setState( { expandedNavigation: false } );
		}

		// Scroll main to the top, if we can.
		if ( this.mainContainer ) {
			this.mainContainer.scrollIntoView( true );
		}
	}

	render() {
		const { menus, sections } = this.props;
		const { expandedNavigation, searchTerm } = this.state;

		const classes = [
			'App',
			expandedNavigation && 'App--nav-open',
		].filter( Boolean );

		return <div className={ classes.join( ' ' ) }>
			<a class="App-skip-link screen-reader-text" href="#content">Skip to content</a>

			<Header
				menu={ menus.primary }
				searchTerm={ searchTerm }
				onUpdateSearch={ term => this.setState( { searchTerm: term } ) }
			/>

			<Route exact path="/" render={ props => (
				<HomeHero
					{ ...window.RedBookData.home_page.hero }
				/>
			) } />

			<div className="App-main wrapper" ref={ ref => this.mainContainer = ref }>
				<Navigation
					expanded={ expandedNavigation }
					sections={ sections }
					onToggle={ () => this.setState( state => ( { expandedNavigation: ! state.expandedNavigation } ) ) }
				/>

				{ searchTerm ? (
					<Search
						id="content"
						term={ searchTerm }
					/>
				) : (
					<Switch>
						<Route path="/login" render={ props =>
							<Login
								id="content"
								{ ...props }
							/>
						} />

						{/* Page Fallback */}
						<Route path="/:path+" render={ props =>
							<Page
								id="content"
								path={ props.match.params.path }
							/>
						} />

						<Route exact path="/" render={ props =>
							<Page
								id="content"
								path="/"
							/>
						} />

					</Switch>
				) }
			</div>

			<Footer
				documentation={ menus.documentation }
				handbooks={ menus.handbooks }
			/>
		</div>;
	}
}

export default App;
