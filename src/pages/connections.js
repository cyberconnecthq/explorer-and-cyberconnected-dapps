import ConnectionsTable from '@/components/ConnectionsTable';
import { Box, Flex } from '@chakra-ui/react';
import { connections_data } from "./connections.data";
import ConnectionsGraph from '../components/ConnectionsGraph'

const ConnectionsPage = () => {
    const cd = Object.entries(connections_data);
    return (<>
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
    </>)
}

export default ConnectionsPage;