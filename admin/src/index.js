import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GraphQLProvider from './utils/GraphQLProvider';
import {Auth0Provider} from './utils/react-auth0-spa.js';

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={'dev-tqekn8lp.eu.auth0.com'}
    client_id={'lPS6gU9EMCtz3YLypM8JF3N14qxaYWlo'}
    audience={'https://luncheon/api'}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <GraphQLProvider>
      <App/>
    </GraphQLProvider>
  </Auth0Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
