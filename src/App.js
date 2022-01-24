import { Box, Flex, Heading, Table, Thead, Tbody, Tr, Th, Spacer, Wrap, WrapItem, Input } from '@chakra-ui/react';
import './App.css';
import NetworkGraph from './NetworkGraph';

function App() {
  return (
    <Box>
      <Flex>
        <Box m={3}> <img src="/images/logo-black.svg" alt='CyberConnect Logo' /> </Box>
        <Spacer />
        <Box><Heading>Radar</Heading></Box>
        <Spacer/>
      </Flex>
      <Box>
      <Heading as='h2' size='lg' my={2}> Enter Adress: </Heading>
        <Input value='0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0'></Input>
      </Box>
      <Box my={3}>
        <Heading as='h2' size='sm' my={2} textColor='gray.500'> Displaying Connections for 0x....f48e0 </Heading>
        <Wrap spacing={4}>
          <WrapItem>
            <Table variant='striped' colorScheme='black'>
              <Thead><Tr><Th textColor='yellow.600'>Following</Th></Tr></Thead>
              <Tbody>
                <Tr><Th>0x....1247</Th></Tr>
                <Tr><Th>0x....3485</Th></Tr>
                <Tr><Th>0x....8964</Th></Tr>
                <Tr><Th>0x....A68F</Th></Tr>
                <Tr><Th>View more ...</Th></Tr>
              </Tbody>
            </Table>
          </WrapItem>
          <WrapItem>
            <Table variant='striped' colorScheme='black'>
              <Thead><Tr><Th textColor='green.600'>Followers</Th></Tr></Thead>
              <Tbody>
                <Tr><Th>0x....3485</Th></Tr>
                <Tr><Th>0x....F786</Th></Tr>
                <Tr><Th>0x....8964</Th></Tr>
                <Tr><Th>0x....A68F</Th></Tr>
                <Tr><Th>View more ...</Th></Tr>
              </Tbody>
            </Table>
          </WrapItem>
          <WrapItem mx={3}>
            <Heading as='h3' size='xs' textColor='gray.400'> Network Graph </Heading>
            <NetworkGraph />
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
}

export default App;
