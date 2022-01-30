import ConnectionsTable from '@/components/ConnectionsTable';
import { isValidAddr } from '@/utils/helper';
import { followListInfoQuery, searchUserInfoQuery } from '@/utils/query';
import { FIRST, NAME_SPACE, NETWORK } from '@/utils/settings';
import theme from '@/utils/theme';
import { FollowListInfoResp, SearchUserInfoResp, ConnectionsData } from '@/utils/types';
import { Box, ChakraProvider, Flex, Heading, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ConnectionsGraph from '../components/ConnectionsGraph';
import { connections_data } from "../context/connections.data";


const ConnectionsPage = () => {
    const cd = Object.entries(connections_data);
    const [address, setAddress] = useState<string>("0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0");

    const [searchAddrInfo, setSearchAddrInfo] = useState<SearchUserInfoResp | null>(null);
    const fetchSearchAddrInfo = async (toAddr: string) => {
        const resp = await searchUserInfoQuery({
            fromAddr: address,
            toAddr,
            namespace: NAME_SPACE,
            network: NETWORK,
        });
        if (resp) {
            setSearchAddrInfo(resp);
            console.log(resp);
        }
    };

    const [followListInfo, setFollowListInfo] =
        useState<FollowListInfoResp | null>(null);

    // Get the current user followings and followers list
    const initFollowListInfo = async () => {
        if (!address) {
            return;
        }

        const resp = await followListInfoQuery({
            address,
            namespace: NAME_SPACE,
            network: NETWORK,
            followingFirst: FIRST,
            followerFirst: FIRST,
        });
        if (resp) {
            setFollowListInfo(resp);
            console.log("Follow List Info: ");
            console.log(resp);
        }
    };

    const [connections, setConnections] = useState<ConnectionsData>({data: []});
    useEffect(() => {
        // TODO: it should be done querying the info for each follower because if there are more than query maximum (FIRST=1000) it could be missing in the list
        // combine followers and following into connections
        let connections = followListInfo?.followers.list.map((follower) => ({...follower, is_follower: true, is_following: false}));
        const following = followListInfo?.followings.list.map((following) => ({...following, is_follower:false, is_following: true}));
        following?.forEach((fing) => {
            let connection_index = connections?.findIndex((fer) => {
                return fer.address == fing.address;
            });
            if (connection_index === -1 || connection_index === undefined) {
                connections?.push(fing);
            } else {
                console.log("index: " + connection_index);
                if(connections == undefined) {
                    connections = [];
                }
                connections[connection_index].is_following = true;
            }
        });
        if(connections !== undefined) {
            setConnections({ data: connections });
        }
    }, [followListInfo]);

    useEffect(() => {
        initFollowListInfo();
    }, [address]);

    const handleInputChange = async (value: string) => {
        setAddress(value);

        if (isValidAddr(value) && address) {
            // setSearchLoading(true);
            await fetchSearchAddrInfo(value);
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box p={6} backgroundColor='black'>
                <Box p={6} rounded='md' margin='auto' bgColor='white'>
                    <Box mb={3}>
                        <Heading as='h2' size='xs' textColor='gray.500' mt={2} mb={0}>Address: </Heading>
                        <Input name="address" bgColor='gray.300' value={address} onChange={(e) => handleInputChange(e.target.value)}></Input>
                    </Box>
                    <Flex>
                        <Box w='30em'>
                            <ConnectionsTable connections={connections} />
                        </Box>
                        <Box w='30em'>
                            <ConnectionsGraph connections={connections} />
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </ChakraProvider>
    )
}

export default ConnectionsPage;