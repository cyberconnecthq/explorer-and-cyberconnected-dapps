import { useQuery } from 'react-query';
import { followListInfoQuery, searchUserInfoQuery } from './query';
import { FIRST, NAME_SPACE, NETWORK } from './settings';
import { SearchUserInfoResp } from './types';

export const useFollowListInfoQuery = (address: string | null) => {
	return useQuery(
		['followListInfoQuery', { address }],
		() => {
			if(address === null) return Promise.reject('address is null');
			return followListInfoQuery({
			address,
			namespace: NAME_SPACE,
			network: NETWORK,
			followingFirst: FIRST,
			followerFirst: FIRST,
		})
	}
	);

};

interface EtherscanResult {
	result: number;
}

export const useEtherscanBalance = (address: string | null) => {
	return useQuery(['etherscan-balance', { address: address }],
		async () => {
			if(address == null) return Promise.reject("invalid address");
			const resp = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=ECK9EWNEXGYJUEAACITH3F2N8DC6GMMHS9`);
			const json =  await resp.json() as Promise<EtherscanResult>;
			return json;
		});
};

export const useAddressInfo = (address: string) => {
	return useQuery<SearchUserInfoResp>(['address-info', { address: address }],
	() => searchUserInfoQuery({
		fromAddr: address,
		toAddr: address,
		namespace: NAME_SPACE,
		network: NETWORK,
	}));
}