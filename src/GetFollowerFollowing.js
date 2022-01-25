import React, { useEffect, useState } from 'react'
import { SEARCH_FOLLOWERS, SEARCH_FOLLOWINGS } from './GraphQL/FollowerFollowingQuery'
import ConnectionsTable from './ConnectionsTable';
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';

export function DisplayFollowers (props) {
	// Returns a list of Followers Addresses
	const { error, loading, data } = useQuery(SEARCH_FOLLOWERS, {variables: {"address": props.address}}); // TODO
	// console.log(error, loading, data)
	const [followers, setFollowers] = useState([])
	useEffect(() => {
		if (data) {
			setFollowers(data.identity.followers.list)
		}
	}, [data])

	if (error) {
		console.log(error);
		return <Box>Error retreiving followers.</Box>
	} else if (loading) {
		return <Box>Loading data ...</Box>
	} else {
		return <ConnectionsTable hColor='yellow.600' heading='Followers' addresses={followers} key="followers.address" />
	}
}

export function DisplayFollowings (props) {
	// Returns a list of Followings Addresses
	const { error, loading, data } = useQuery(SEARCH_FOLLOWINGS, {variables: {"address": props.address}}); // TODO
	// console.log(error, loading, data)
	const [followings, setFollowings] = useState([])
	useEffect(() => {
		if (data) {
			setFollowings(data.identity.followings.list)
		}
	}, [data])

	if (error) {
		console.log(error);
		return <Box>Error retreiving followings.</Box>
	} else if (loading) {
		return <Box>Loading data ...</Box>
	} else {
		return (
			<ConnectionsTable hColor='green.600' heading={'Following'} addresses={followings} key="followings.address" />
		)
	}
}