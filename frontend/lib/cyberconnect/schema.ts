
export const identitySchema = ({
  address,
  namespace,
  network,
  followingFirst,
  followingAfter,
  followerFirst,
  followerAfter,
}) => {
  return {
    operationName: "identityQuery",
    query: `query identityQuery(
      $address: String!,
      $namespace: String,
      $network: Network,
      $followingFirst: Int,
      $followingAfter: String,
      $followerFirst: Int,
      $followerAfter: String) {
      identity(address: $address, network: $network) {
        domain,
        address,
        avatar,
        followingCount(namespace: $namespace),
        followerCount(namespace: $namespace),
        followings(namespace: $namespace, first: $followingFirst, after: $followingAfter) {
          pageInfo {
            endCursor,
            hasNextPage
          },
          list {
            address,
            domain,
            avatar
          }
        }
        followers(namespace: $namespace, first: $followerFirst, after: $followerAfter) {
          pageInfo {
            endCursor
            hasNextPage
          }
          list {
            address
            domain
            avatar
          }
        }
      }
    }`,
    variables: {
      address,
      namespace,
      network,
      followingFirst,
      followingAfter,
      followerFirst,
      followerAfter,
    },
  };
};

export const simpleIdentitySchema = ({ address, network }) => {
  return {
    operationName: "userInfoQuery",
    query: `query userInfoQuery($address: String!, $network: Network) {
      identity(address: $address, network: $network) {
        address,
        domain,
        avatar,
      }
    }`,
    variables: {
      address,
      network,
    },
  };
};


export const followInfoSchema = ({
  fromAddr,
  toAddr,
  namespace,
  network,
}) => {
  return {
    operationName: "followInfo",
    query: `query followInfo($fromAddr: String!, $toAddr: String!, $namespace: String, $network: Network) {
      identity(address: $toAddr, network: $network) {
        address
        domain
        avatar
        ens
      }
      followStatus(fromAddr: $fromAddr, toAddr: $toAddr, namespace: $namespace, network: $network) {
        isFollowed
        isFollowing
      }
    }`,
    variables: {
      fromAddr,
      toAddr,
      namespace,
      network,
    },
  };
};

export const registerKeySchema = ({ address, message, signature, network }) => {
  return {
    operationName: "registerKeySchema",
    query: `mutation registerKeySchema($input: RegisterKeyInput!){
      registerKey(input:$input){
        result
      }
    }`,
    variables: {
      input: {
        address,
        message,
        signature,
        network,
      },
    },
  };
};

export const recommendsSchema = ({
  address,
  filter,
  first,
  after,
  network,
}) => {
  return {
    operationName: "recommendationsQuery",
    query: `query recommendationsQuery (
      $address: String!,
      $filter: RecommFilter,
      $network: Network,
      $first: Int,
      $after: String){
        recommendations (
          address: $address,
          filter: $filter,
          network: $network,
          first: $first,
          after: $after){
        result,
        data{
          pageInfo{
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage,
          },
          list{
            address,
            domain,
            avatar,
            recommendationReason,
            followerCount
          }
        }
      }
    }`,
    variables: {
      address,
      filter,
      first,
      after,
      network,
    },
  };
};


export const homePageSchema = ({ network }) => {
  return {
    operationName: "homePage",
    query: `query homePage($network: Network){
      homePage(network: $network){
        userCount
        connectionCount
      }
    }`,
    variables: {
      network,
    },
  };
};

/*
mutation {
  registerKey(
    input: {
      address: "0xF791ff20C453b718a85721C0E543a788E73D1eEc",
      message: "xxx",
      signature: "0xec531ac049f1f635de8db0ace48a44b7ef7545034ef1b19ca3e40443299bfb0756a5850a0bc5eff61cc71f67565f5e13bf191f421052cbe48be1d7bf58915fe01c",
      network: ETH
    }
  ) {
    result
  }
}

query {
  identity(
    address: "0x073443ce5ae3e53a57b4a5671b69bde0e9b772de"
    network: ETH
  ) {
    domain,
    avatar,
    address
  }
}

query {
  recommendations (
    address: "0x073443ce5ae3e53a57b4a5671b69bde0e9b772de",
    filter: SOCIAL,
    network: ETH,
    first: 20,
    after: "-1"){
    result,
    data{
      pageInfo{
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage,
      },
      list{
        address,
        domain,
        avatar,
        recommendationReason,
        followerCount
      }
    }
  }
}

*/
