import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { is_follower, is_following } from "../context/connections.data";
import Identicon from 'react-identicons';
import { ConnectionsData } from "@/utils/types";

interface ConnectionsTableProps {
    connections: ConnectionsData;
}

function ConnectionsTable(props : ConnectionsTableProps) {
    return (
        <Box>
            {props.connections.data.map(entry =>
                <Flex
                    alignItems='center'
                    justifyContent='flex-start'
                    maxW='33em'
                    gap={0}
                    key={entry.address}
                >
                    <Box>
                        <Flex minW='4em' alignItems='center' mx={-3}>
                            <Tooltip label={entry.is_follower ? 'Is a follower.' : "Isn't a follower."} >
                                <ChevronRightIcon w={6} h={6} mr={-1} color={
                                    entry.is_follower ? 'green.400' : 'gray.400'} /></Tooltip>
                            <Identicon string={entry.address} size={15} />
                            <Tooltip label={entry.is_following ? 'Is being followed.' : "Isn't being followed."} >
                                <ChevronLeftIcon w={6} h={6} ml={-1} color={
                                    entry.is_following ? 'yellow.400' : 'gray.400'} />
                            </Tooltip>
                        </Flex>
                    </Box>
                    <Box
                        key={entry.address}
                        wordBreak='break-all'
                        fontFamily='monospace'
                    >
                        {entry.address}
                    </Box>
                </Flex>
            )}
        </Box>)
}

export default ConnectionsTable;