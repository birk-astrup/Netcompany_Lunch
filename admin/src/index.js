import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
  
const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
});

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'http://myadress.com/graphql' : 'http://localhost:5000/graphql',
  cache,
});


ReactDOM.render(
<ApolloProvider client={client}>
  <App/>
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
