import {
  FollowListInfoArgs,
  SearchUserInfoArgs,
  FollowListInfoResp,
  SearchUserInfoResp,
  Network,
} from "./types";

const endPoint = "https://api.cybertino.io/connect/";

const NETWORK = Network.ETH;
const NAMESPACE = "twitter"; //"cyberconnect";
const FILTER = "SOCIAL";
const FIRST = "20";
const AFTER = "-1";

const followListInfoSchema = ({
  address,
  namespace = NAMESPACE,
  network = NETWORK,

  followingFirst,
  followingAfter,
  followerFirst,
  followerAfter,
}: FollowListInfoArgs) => {
  return {
    operationName: "followListInfo",
    query: `query followListInfo(
      $address: String!,
      $namespace: String,
      $network: Network,
      $followingFirst: Int,
      $followingAfter: String,
      $followerFirst: Int,
      $followerAfter: String) {
      identity(address: $address, network: $network) {
        domain
        followingCount(namespace: $namespace)
        followerCount(namespace: $namespace)
        followings(namespace: $namespace, first: $followingFirst, after: $followingAfter) {
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

const searchUserInfoSchema = ({
  fromAddr,
  toAddr,
  namespace = NAMESPACE,
  network = NETWORK,
}: SearchUserInfoArgs) => {
  return {
    operationName: "searchUserInfo",
    query: `query searchUserInfo($fromAddr: String!, $toAddr: String!, $namespace: String, $network: Network) {
      identity(address: $toAddr, network: $network) {
        address
        domain
        avatar
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

const registerKeySchema = ({
  address,
  message,
  signature,
  network = NETWORK,
}) => {
  return {
    operationName: "registerKey",
    query: `mutation registerKey($input: RegisterKeyInput!){
      registerKey(input:$input){
        result
      }
    }`,
    variables: {
      input: {
        address,
        message,
        signature,
        network: NETWORK,
      },
    },
  };
};

const recommendSchema = ({
  address,
  filter = FILTER,
  first = FIRST,
  after = AFTER,
  network = NETWORK,
}) => {
  return {
    operationName: "recommendations ",
    query: `query recommendations (
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

export const request = async (url = "", data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
};

export const handleQuery = (
  data: {
    query: string;
    variables: object;
    operationName: string;
  },
  url: string
) => {
  return request(url, data);
};

export const followListInfoQuery = async ({
  address,
  namespace,
  followingFirst,
  followingAfter,
  followerFirst,
  followerAfter,
}: FollowListInfoArgs) => {
  const schema = followListInfoSchema({
    address,
    namespace,
    followingFirst,
    followingAfter,
    followerFirst,
    followerAfter,
  });
  const resp = await handleQuery(schema, endPoint);

  return (resp?.data?.identity as FollowListInfoResp) || null;
};

export const searchUserInfoQuery = async ({
  fromAddr,
  toAddr,
  namespace,
}: SearchUserInfoArgs) => {
  const schema = searchUserInfoSchema({
    fromAddr,
    toAddr,
    namespace,
  });
  const resp = await handleQuery(schema, endPoint);

  return (resp?.data as SearchUserInfoResp) || null;
};

export const auth = async (address, message, signature) => {
  console.log("auth");

  const schema = registerKeySchema({
    address,
    message,
    signature,
  });
  const resp = await handleQuery(schema, endPoint);

  const res = resp?.data?.registerKey?.result || null;
  return res;
};

export const recommend = async ({
  address,
  filter = FILTER,
  first = FIRST,
  after = AFTER,
  network = NETWORK,
}) => {
  console.log("recommend");

  const schema = recommendSchema({
    address,
    filter,
    first,
    after,
    network,
  });
  const resp = await handleQuery(schema, endPoint);

  const res = resp?.data?.registerKey?.result || null;
  return resp;
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