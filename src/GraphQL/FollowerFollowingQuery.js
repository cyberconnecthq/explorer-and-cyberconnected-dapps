import { gql } from "@apollo/client";
import { useQuery } from '@apollo/client'

export const LoadFollowers = gql`
query {
    identity(address: "0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0")
    {
        ens
        address
        followerCount
        followers
        {
            list
            {
                address
            }
        }
    }
}
`

export const SearchFollowers = gql`
query SearchAddress($searchAddress: String!){
    identity(address: $searchAddress)
    {
        ens
        address
        followerCount
        followers
        {
            list
            {
                address
            }
        }
    }
}
`

export const LoadFollowings = gql`
query {
	identity(address: "0x0c493e5fb71428ba99edcb1bbccd925fdd1f48e0")
    {
        ens
        address
        followingCount
        followings
        {
            list
            {
                address
            }
        }
    }
}
`

export const SearchFollowings = gql`
query SearchAddress($searchAddress: String!){
	identity(address: $searchAddress)
    {
        ens
        address
        followingCount
        followings
        {
            list
            {
                address
            }
        }
    }
}
`

// TODO: The following functions of searching up addresses aren't working
export const useFollowersAddress = (address) => {
	const { data, error, loading } = useQuery(SearchFollowers, {
		variables: {
			address
		}
	})

	return {
		data,
		error,
		loading
	}
}

export const useFollowingsAddress = (address) => {
	const { data, error, loading } = useQuery(SearchFollowings, {
		variables: {
			address
		}
	})

	return {
		data,
		error,
		loading
	}
}