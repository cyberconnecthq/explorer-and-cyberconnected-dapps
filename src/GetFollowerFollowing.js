import React, { useEffect, useState } from 'react'
import { useFollowingsAddress, useFollowersAddress, LoadFollowers, LoadFollowings } from './GraphQL/FollowerFollowingQuery'
import ConnectionsTable from './ConnectionsTable';
import { useQuery } from '@apollo/client'

export default function GetFollowerFollowing () {
	// This is a sample function of displaying
	// Followers and Followings simplicity
	const followers = GetFollowers()
	const followings = GetFollowings()
	return (
		<div>
			<h3>Followers</h3>
			{followers.map((f) => {
				return <p>{f.address}</p>
			})}
			<br />
			<h3>Followings</h3>
			{followings.map((f) => {
				return <p>{f.address}</p>
			})}
		</div>
	)
}

export function DisplayFollowers () {
	const followers = GetFollowers()
	return (
		<ConnectionsTable hColor='yellow.600' heading='Followers' addresses={followers} key="followers.address" />
	)
}

export function DisplayFollowings () {
	const followings = GetFollowings()
	return (
		<ConnectionsTable hColor='green.600' heading='Followings' addresses={followings} key="followings.address" />
	)
}

export function GetFollowers () {
	// Returns a list of Followers Addresses
	const { error, loading, data } = useQuery(LoadFollowers)
	// const { error, loading, data } = useFollowersAddress("0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0") // TODO
	// console.log(error, loading, data)
	const [followers, setFollowers] = useState([])
	useEffect(() => {
		if (data) {
			setFollowers(data.identity.followers.list)
		}
	}, [data])

	// TODO: Error Handling
	// if (error) return alert(`Something went wrong: {error}`)

	// TODO: When 'loading' is true
	// if (loading) return <div>Spinner....</div>

	return followers;
}

export function GetFollowings () {
	// Returns a list of Followings Addresses
	const { error, loading, data } = useQuery(LoadFollowings)
	console.log(error, loading, data)
	// const { error, loading, data } = useFollowingsAddress("0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0") // TODO
	const [followings, setFollowings] = useState([])
	useEffect(() => {
		if (data) {
			setFollowings(data.identity.followings.list)
		}
	}, [data])

	// TODO: Error Handling
	// if (error) return alert(`Something went wrong: {error}`)

	// TODO: When 'loading' is true
	// if (loading) return <div>Spinner....</div>

	return followings;
}