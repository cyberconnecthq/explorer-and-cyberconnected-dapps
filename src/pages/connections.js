import ConnectionsTable from '@/components/ConnectionsTable';
import { Box, Flex } from '@chakra-ui/react';
import { connections_data } from "../context/connections.data";
import ConnectionsGraph from '../components/ConnectionsGraph'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/utils/theme';

const ConnectionsPage = () => {
    const cd = Object.entries(connections_data);
    return (
        <ChakraProvider theme={theme}>
            <Box p={6} backgroundColor='black'>
                <Flex p={6} rounded='md' margin='auto' bgColor='white'>
                    <Box w='30em'>
                        <ConnectionsTable data={cd} />
                    </Box>
                    <Box w='30em'>
                        <ConnectionsGraph data={cd} />
                    </Box>
                </Flex>
            </Box>
        </ChakraProvider>
    )
}

export default ConnectionsPage;