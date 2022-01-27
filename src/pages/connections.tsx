import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { NextPage } from "next";
import { connections_data, IS_FOLLOWER, IS_FOLLOWING } from "./connections.data";
import Identicon from 'react-identicons';

const Connections: NextPage = () => {
    const cd = Object.entries(connections_data);
    return (<>
        <Box p={6}>
            <Box p={6} bg='black' textColor='white' rounded='md'>
                {cd.map(([address, opts]) =>
                    <Flex
                        alignItems='center'
                        justifyContent='flex-start'
                        maxW='33em'
                        gap={0}
                    >
                        <Flex minW='4em' alignItems='center' mx={-3}>
                            <Tooltip label={(opts & IS_FOLLOWER) ? 'Is a follower.' : "Isn't a follower."} >
                                <ChevronRightIcon w={6} h={6} mr={-1} color={
                                    (opts & IS_FOLLOWER) ? 'green.400' : 'gray.400'} /></Tooltip>
                            <Identicon string={address} size={15} />
                            <Tooltip label={(opts & IS_FOLLOWING) === IS_FOLLOWING ? 'Is being followed.' : "Isn't being followed."} >
                                <ChevronLeftIcon w={6} h={6} ml={-1} color={
                                    (opts & IS_FOLLOWING) === IS_FOLLOWING ? 'yellow.400' : 'gray.400'} />
                            </Tooltip>
                        </Flex>
                        <Box
                            key={address}
                            wordBreak='break-all'
                            fontFamily='monospace'
                        >
                            {address}
                        </Box>
                    </Flex>
                )}
            </Box>
        </Box>
    </>)
}

export default Connections;