import { Container, VStack, Box } from '@chakra-ui/react';
import './App.css';
import NetworkGraph from './NetworkGraph';

function App() {
  return (
    <VStack m={10}>
      <Container>
        <img src="/images/logo-black.svg" alt='CyberConnect Logo' />
      </Container>
      <Container border='1px' borderColor='gray.400' >
          <NetworkGraph />
      </Container>
    </VStack>
  );
}

export default App;
