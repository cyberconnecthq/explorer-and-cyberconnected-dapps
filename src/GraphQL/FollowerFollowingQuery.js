import { gql } from "@apollo/client";

export const SEARCH_FOLLOWERS = gql`
query SearchAddress($address: String!){
    identity(address: $address)
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

export const SEARCH_FOLLOWINGS = gql`
query SearchAddress($address: String!){
	identity(address: $address)
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
