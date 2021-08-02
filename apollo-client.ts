import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'cross-fetch'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://countries.trevorblades.com', fetch }),
  cache: new InMemoryCache(),
})

export default client
