/**
 * 
 */

import {
  SearchUserInfoResp,
  Network,
} from "./types";
import {
  homePageSchema,
  identitySchema,
  simpleIdentitySchema,
  followInfoSchema,
  recommendsSchema,
  registerKeySchema,
} from "./schema";

export const END_POINT = "https://api.cybertino.io/connect/";
export const NETWORK = Network.ETH;
export const NAMESPACE = "cctwitter"; //"cyberconnect";
const FILTER = "SOCIAL";
const FIRST = "20";
const AFTER = "-1";

export const simpleIdentityQuery = async ({ address, network = NETWORK }) => {
  const schema = simpleIdentitySchema({
    address,
    network,
  });
  const resp = await handleQuery(schema, END_POINT);

  return resp?.data;
};


export const identityQuery = async ({
  address,
  namespace = "89",//NAMESPACE,
  followingFirst = 20,
  followingAfter = "-1",
  followerFirst = 20,
  followerAfter = "-1",
  network = Network.ETH,
}) => {
  const schema = identitySchema({
    address,
    namespace,
    followingFirst,
    followingAfter,
    followerFirst,
    followerAfter,
    network,
  });
  const resp = await handleQuery(schema, END_POINT);

  return resp?.data?.identity;
};

export const followInfoQuery = async ({ fromAddr, toAddr, namespace, network }) => {
  const schema = followInfoSchema({
    fromAddr,
    toAddr,
    namespace,
    network,
  });
  const resp = await handleQuery(schema, END_POINT);

  return (resp?.data as SearchUserInfoResp) || null;
};

export const registerKey = async ({
  address,
  message,
  signature,
  network = NETWORK,
}) => {
  const schema = registerKeySchema({
    address,
    message,
    signature,
    network,
  });
  const resp = await handleQuery(schema, END_POINT);

  const res = resp?.data?.registerKey?.result || null;
  return res;
};

export const recommendsQuery = async ({
  address,
  filter = FILTER,
  first = FIRST,
  after = AFTER,
  network = NETWORK,
}) => {
  const schema = recommendsSchema({
    address,
    filter,
    first,
    after,
    network,
  });
  const resp = await handleQuery(schema, END_POINT);

  const res = resp?.data?.recommendations;
  return res;
};

export const homePageQuery = async (network = NETWORK) => {
  const schema = homePageSchema({ network });
  const resp = await handleQuery(schema, END_POINT);

  const res = resp?.data?.registerKey?.result || null;
  return resp;
};

//////////////////////////////////////////////////////////////////////////
export const request = async (url = "", data = {}) => {
  // Default options are marked with *
  try {
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
  } catch (err) {
    console.error(url);
    throw err;
  }
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
