import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, StaticRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import render from 'react-wp-ssr';

import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './base.css';
import './index.css';

const initialState = {
	pages:    window.RedBookData.pages,
	sections: window.RedBookData.sections,
	user:     {
		data:  window.RedBookData.user,
		nonce: window.RedBookData.nonce,
	},
};

const middleware = [
	thunk,
];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers( applyMiddleware( ...middleware ) )
);

const appProps = {
	menus: window.RedBookData.menus,
	posts: window.RedBookData.posts,
	sections: window.RedBookData.sections,
};

const getRenderer = App => environment => {
	const Router = environment === 'server' ? StaticRouter : BrowserRouter;
	const routerProps = environment === 'server' ? { location: window.location, context: {} } : {};

	return <Provider store={ store }>
		<Router { ...routerProps }>
			<Route component={ props => <App { ...props} { ...appProps } /> } />
		</Router>
	</Provider>;
};

render( getRenderer( App ) );
// registerServiceWorker();

if ( module.hot ) {
	module.hot.accept( './App', () => {
		import( './App' ).then( newAppModule => {
			render( getRenderer( newAppModule.default ) );
		} );
	} );
}
