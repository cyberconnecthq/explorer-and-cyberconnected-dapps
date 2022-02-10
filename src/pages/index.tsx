import ConnectionsTable from '@/components/ConnectionsTable';
import { CovalentTransactionsForAddressResp, ICovalentGetTransactionsForAddressData, useCovalentTransactionsForAddress } from '@/utils/covalent_query';
import { isValidAddr } from '@/utils/helper';
import { useAddressInfo, useEtherscanBalance, useFollowListInfoQuery } from '@/utils/hooks';
import { recommendationListQuery, searchUserInfoQuery } from '@/utils/query';
import { NAME_SPACE, NETWORK } from '@/utils/settings';
import theme from '@/utils/theme';
import { ConnectionData, ConnectionsData, FollowListInfoResp, RecommendedUser, SearchUserInfoResp } from '@/utils/types';
import { Box, ChakraProvider, Flex, Heading, Input, Skeleton, Spinner } from '@chakra-ui/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ConnectionsGraph from '../components/ConnectionsGraph';


const ConnectionsPage = () => {
    const [address, setAddress] = useState<string | null>("0x1dd779850b584e10e8f95b03a2a86b90b312d75d");
    const [addressInputImmediate, setAddressInputImmediate] = useState<string>("0x1dd779850b584e10e8f95b03a2a86b90b312d75d");

    const [recommendedList, setRecommendedList] =
        useState<RecommendedUser[]>([]);
    const balanceState = useEtherscanBalance(address);
    const useFollowListInfo = useFollowListInfoQuery(address);

    useEffect(()=>{
        useFollowListInfo.data && setAddress(useFollowListInfo.data.address);
    }, [useFollowListInfo.data])

    const [connections, setConnections] = useState<ConnectionsData>({data: []});
    const covalentQuery = useCovalentTransactionsForAddress(address);
    const [connectionsLoading, setConnectionsLoading] = useState<boolean>(true);

    // Load connections
    useLayoutEffect(() => {
        // TODO: it should be done querying the info for each follower because if there are more than query maximum (FIRST=1000) it could be missing in the list
        // combine followers and following into connections
        setConnectionsLoading(true);
        const followListInfo = useFollowListInfo.data;
        if (useFollowListInfo.data !== undefined) {
        let connections: ConnectionData[] = createConnectionsData(followListInfo, covalentQuery.isSuccess, covalentQuery.data, address);
        setConnections({ data: connections });
        }
        setConnectionsLoading(false);
    }, [useFollowListInfo.data, covalentQuery.data, covalentQuery.isSuccess, address]);

    useEffect(() => {
        // load recommendations
        if (!address) return;
        recommendationListQuery({ address: address }).then( (resp) => setRecommendedList(resp) );
    }, [address]);

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    function changeAddressImmediate(address: string) { // update Address after 500 ms
        setAddressInputImmediate(address);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                changeAddress(address);
            }, 500)
        );
    }

    const changeAddress = async (value: string) => {
        // update address only if it is valid
        if (addressInputImmediate !== value) {
            setAddressInputImmediate(value);
        }
        if (isValidAddr(value)) {
            setAddress(value);
            if( address ) setHighlightAddress(address);
        }
        else if(value.slice(-4,-1) == '.eth'){
            setAddress(null); // if eth domain wait for addressInfo
        }
    };

    const addressInfo = useAddressInfo(addressInputImmediate);
    useEffect( () => {
        if(addressInfo.isSuccess) {
            if(address !== addressInfo?.data?.identity.address)
                setAddress(addressInfo?.data?.identity.address);
        }
    }, [address, addressInfo.isSuccess, addressInfo.data]);

    const [height, setHeight] = useState(200);
    const [width, setWidth] = useState(200);
    const graphRef = useRef<HTMLDivElement | null>(null);
    const onResize = useEffect(() => {
        // resize Graph Window
        if (graphRef !== null && graphRef.current !== null) {
            setHeight(graphRef.current.getBoundingClientRect().height);
            setWidth(graphRef.current.getBoundingClientRect().width);
        }
        window.onresize = () => {
            if(graphRef !== null && graphRef.current !== null) {
                setHeight(graphRef.current.getBoundingClientRect().height);
                setWidth(graphRef.current.getBoundingClientRect().width);
            }
        };
    },[setWidth, setHeight, graphRef])

    const [highlightAddress, setHighlightAddress] = useState("");
    const setHighlightCallback = useCallback((str)=>setHighlightAddress(str), []);

    return (
        <ChakraProvider theme={theme}>
            <Box p={6} backgroundColor='black' bgGradient='linear(to-tr, black, blue.800, pink.900)' height='100vh' minHeight='600px' width='100%'>
                <Flex p={6} rounded='md' margin='auto' bgColor='blackAlpha.600' direction='column' height='100%' minW='250px'>
                    <Box mb={3} flex={0}>
                        <Flex align='end' flexWrap={['wrap', 'wrap', 'nowrap']}>
                            <Box flex={2} minW='200px'>
                                <Heading as='h2' size='xs' textColor='gray.500' mt={2} mb={0}>Address: </Heading>
                                <Input name="address" bgColor='gray.700' value={addressInputImmediate} onChange={(e) => {changeAddressImmediate(e.target.value)}}></Input>
                            </Box>
                            <Box ml={3} flex={1}>
                                {address === undefined ? 'Invalid address' :
                                    <>
                                        <Box> {
                                            address !== addressInputImmediate ? address :
                                                addressInfo.data?.identity?.ens || 'no domain for current address'
                                        } </Box>
                                        {balanceState.isFetched && balanceState?.data ?
                                            (balanceState.data.result / 1e18).toLocaleString('en-IN', { maximumSignificantDigits: 4 }) :
                                            <Spinner size='xs' />} &Xi;</>
                                }

                            </Box>
                            </Flex>
                    </Box>
                    <Flex flex={1} minHeight='300px' alignItems='stretch' gap={5}>
                        <Box flexBasis='26em' flexGrow={0}>
                            {useFollowListInfo.isSuccess && !connectionsLoading && address ?
                            <ConnectionsTable 
                                connections={connections}
                                recommendations={recommendedList}
                                highlightAddress={highlightAddress}
                                setHighlight={setHighlightCallback}
                                changeAddress={changeAddressImmediate}
                            />
                            : <Skeleton startColor='pink.500' endColor='orange.500' height={height} />
                            }
                        </Box>
                        <Box flexGrow={1} p={5} overflow='hidden' ref={graphRef}>
                            {width > 400 &&
                                <Box height='100%' width='100%' >
                                    {!useFollowListInfo.isLoading && address !== undefined? 
                                    <ConnectionsGraph address={address}
                                        connections={connections}
                                        width={width}
                                        height={height}
                                        highlightAddress={highlightAddress}
                                        setHighlight={setHighlightCallback}
                                        /> :
                                        <Skeleton startColor='pink.500' endColor='orange.500' height={height} />
                                    }
                                </Box>
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </ChakraProvider>
    )
}

export default ConnectionsPage;

function createConnectionsData(followListInfo: FollowListInfoResp | undefined, covalentQueryIsSuccess: boolean, covalentQueryData: undefined | ICovalentGetTransactionsForAddressData, address: string | null) {
    let connections: ConnectionData[] = followListInfo?.followers?.list.map((follower) => ({ ...follower, is_follower: true, is_following: false, has_interacted: false })) || [];
    const following: ConnectionData[] = followListInfo?.followings?.list.map((following) => ({ ...following, is_follower: false, is_following: true, has_interacted: false })) || [];
    following?.forEach((fing) => {
        let connection_index = connections?.findIndex((fer) => {
            return fer.address == fing.address;
        });
        if (connection_index === -1 || connection_index === undefined) {
            connections?.push(fing);
        } else {
            if (connections == undefined) {
                connections = [];
            }
            connections[connection_index].is_following = true;
        }
    });
    if (covalentQueryIsSuccess) {
        let covalentConnections: ConnectionData[] = covalentQueryData?.items.map(item => ({
            address: item.from_address === address ? item.to_address : item.from_address,
            is_follower: false,
            is_following: false,
            has_interacted: true
        })).filter((item) => item.address !== address) || [];
        covalentConnections?.forEach((covalent) => {
            let connection_index = connections?.findIndex((connection) => {
                return covalent.address == connection.address;
            });
            if (connection_index === -1 || connection_index === undefined) {
                connections?.push(covalent);
            } else {
                if (connections == undefined) {
                    connections = [];
                }
                connections[connection_index].has_interacted = true;
            }
        });
    }
    return connections;
}
