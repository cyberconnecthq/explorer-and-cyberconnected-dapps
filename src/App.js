import { Box, Container, Grid, Heading, Wrap, WrapItem, Input } from '@chakra-ui/react';
import './App.css';
import NetworkGraph from './NetworkGraph';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client"
import { onError } from '@apollo/client/link/error'
import { DisplayFollowers, DisplayFollowings } from './GetFollowerFollowing';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL Error: {message}`);
      return true;
    })
  }
})
const link = from(
  [
    errorLink,
    new HttpLink({ uri: "https://api.cybertino.io/connect/" })
  ]
)
const client = new ApolloClient(
  {
    cache: new InMemoryCache(),
    link: link
  }
)

function App () {
  return (
    <ApolloProvider client={client}>
      <Box>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          <Box m={3}> <img src="/images/logo-black.svg" alt='CyberConnect Logo' /> </Box>
          <Box><Heading>Radar</Heading></Box>
          <Box />
        </Grid>
        <Box>
          <Container maxW='container.lg'>
            <Heading as='h2' size='lg' my={2}> Enter Adress: </Heading>
            <Input defaultValue='0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0'></Input>

            <Heading as='h2' size='sm' my={2} textColor='gray.500'> Displaying Connections for 0x....f48e0 </Heading>
            <Wrap spacing={4}>
              <WrapItem>
                <DisplayFollowers />
              </WrapItem>
              <WrapItem>
                <DisplayFollowings />
              </WrapItem>
              <WrapItem>
                <Heading as='h3' size='xs' textColor='gray.400'> Network Graph </Heading>
                <NetworkGraph />
              </WrapItem>
            </Wrap>
          </Container>
        </Box>

      </Box>
    </ApolloProvider>
  );
}

export default App;
