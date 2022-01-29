import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { is_follower, is_following } from "../pages/connections.data";
import Identicon from 'react-identicons';

function ConnectionsTable(props) {
    return (
        <Box>
            {props.data.map(([address, opts]) =>
                <Flex
                    alignItems='center'
                    justifyContent='flex-start'
                    maxW='33em'
                    gap={0}
                    key={address}
                >
                    <Box>
                        <Flex minW='4em' alignItems='center' mx={-3}>
                            <Tooltip label={is_follower(opts) ? 'Is a follower.' : "Isn't a follower."} >
                                <ChevronRightIcon w={6} h={6} mr={-1} color={
                                    is_follower(opts) ? 'green.400' : 'gray.400'} /></Tooltip>
                            <Identicon string={address} size={15} />
                            <Tooltip label={is_following(opts) ? 'Is being followed.' : "Isn't being followed."} >
                                <ChevronLeftIcon w={6} h={6} ml={-1} color={
                                    is_following(opts) ? 'yellow.400' : 'gray.400'} />
                            </Tooltip>
                        </Flex>
                    </Box>
                    <Box
                        key={address}
                        wordBreak='break-all'
                        fontFamily='monospace'
                    >
                        {address}
                    </Box>
                </Flex>
            )}
        </Box>)
}

export default ConnectionsTable;