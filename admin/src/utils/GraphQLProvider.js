import React, {useEffect, useState} from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient, {InMemoryCache} from 'apollo-boost';

import {useAuth0} from './react-auth0-spa';
  
// Caching for graphql when refetching data
const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
});

export default ({children}) => {
  const [accToken, setAccToken] = useState();
  const {isAuthenticated, getTokenSilently} = useAuth0();

  // Gets user token if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      let access = async () => {
        let token = await getTokenSilently();
        setAccToken(token);
      }
      access();
    } catch (e) {
      console.error('ERROR FROM GETTING ACCESS TOKEN: ',e);
    }

  }, [getTokenSilently, isAuthenticated])

  // Apollo client that sends access token to backend
  const client = new ApolloClient({
    uri: process.env.NODE_ENV === 'production' ? 'http://http://net-lunch.herokuapp.com/graphql' : 'http://localhost:5000/graphql',
    cache,
    request: async op => {
      op.setContext(context => ({
        headers: {
          ...context.headers,
          Authorization: accToken ? `Bearer ${accToken}` : '',
        },
      }));
    },
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}