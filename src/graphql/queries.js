

export const DEMO=`
query {
  identity(address: "0x148d59faf10b52063071eddf4aaf63a395f2d41c", network: ETH) {
    domain
  }
}
` 


export const  IDENTITY_QUERY=`
query FullIdentityQuery($address: String!, $first: Int!, $after: String!){
    identity(address: $address, network: ETH) {
      address
      domain
      social {
        twitter
      }
      avatar
      joinTime
      followerCount(namespace: "CyberConnect")
      followingCount(namespace: "CyberConnect")
      followings(namespace: "CyberConnect", first: $first, after: $after) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        } 
        list {
          address
          domain
          avatar
          alias
          namespace
          lastModifiedTime
          verifiable
        } 
      }
      followers(namespace: "CyberConnect", first: $first, after: $after) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        } 
        list {
          address
          domain
          avatar
          alias
          namespace
          lastModifiedTime
          verifiable
        } 
      }
      friends(namespace: "CyberConnect", first: $first, after: $after) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        } 
        list {
          address
          domain
          avatar
          alias
          namespace
          lastModifiedTime
          verifiable
        } 
      }
    }
  }
`

export const MUTUAL_FOLLOW_QUERY = `
query FollowStatus($fromAddr: String!, $toAddr: String!){
    followStatus(
      fromAddr: $fromAddr
      toAddr: $toAddr
      network: ETH) {
      isFollowed
      isFollowing
    }
  }
`

export const RECOMMENDATION_QUERY = `
query QueryRecommendation($address: String!, $filter: RecommFilter!,  $first: Int!, $after: String!){
    recommendations(
      address: $address
      filter: $filter
      network: ETH
      first: $first
      after: $after
    ) {
      result
      data {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        list {
          address
          domain
          avatar
          recommendationReason
          followerCount
        } 
      }
    }
  }
`



export const BASIC_INFO=`
query BasicInfo($address: String!){
  identity(address: $address, network: ETH) {
    address
    domain
    social {
      twitter
    }
    avatar
    joinTime
    followerCount(namespace: "CyberConnect")
    followingCount(namespace: "CyberConnect")
    
  }
}
`

export const POAP_RECCOMENDATIONS=`
query Recommendations($id: ID!)
{
    event(id: $id ) {
        tokens {
            id
            owner {
                id
            }
        }
    }
}
`