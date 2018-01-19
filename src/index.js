import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import 'primer-base/build/build.css';
import './index.css';

const initialState = {
	pages: window.RedBookData.posts,
	sections: window.RedBookData.sections,
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

const render = AppComponent => {
	ReactDOM.render(
		<Provider store={ store }>
			<BrowserRouter>
				<Route component={ props => <App { ...props} { ...appProps } /> } />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);
};

render( App );
// registerServiceWorker();

if ( module.hot ) {
	module.hot.accept( './App', () => {
		import( './App' ).then( newAppModule => {
			render( newAppModule.default );
		} );
	} );
}
