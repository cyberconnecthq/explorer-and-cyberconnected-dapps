import MetaMaskOnboarding from "@metamask/onboarding";
//import detectEthereumProvider from '@metamask/detect-provider';
import CyberConnect, { Env, Blockchain } from "@cyberlab/cyberconnect";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";

//import assert from 'assert'
//import Web3 from 'web3';

console.log("start");

const { isMetaMaskInstalled } = MetaMaskOnboarding;
const currentUrl = new URL(window.location.href);
const forwarderOrigin =
  currentUrl.hostname === "localhost" ? "http://localhost:9010" : undefined;

let g_account;
let g_onboarding;

main();

async function main() {
  if (!isMetaMaskInstalled()) {
    alert("please install MetaMask extension!");
    try {
      g_onboarding = new MetaMaskOnboarding({ forwarderOrigin });
      g_onboarding.startOnboarding();
    } catch (error) {
      console.error(error);
      return;
    }
  }
  console.log("MetaMask installed");
  g_account = await enableMyAccount();
  //g_accounts = findMyAccount();
  console.log(g_account);

  await connect();
}

async function connect() {
  //const provider = await detectEthereumProvider();
  //const provider = ethers.getDefaultProvider( [ network , [ options ] ] )
  //const provider = ethers.getDefaultProvider();
  const provider = new ethers.providers.Web3Provider(ethereum);
  let web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
  });

  const modalProvider = await web3Modal.connect();
  const ethersProvider = new Web3Provider(modalProvider);

  const cyberConnect = new CyberConnect({
    provider: provider,
    //provider: ethersProvider,
    //ethProvider: ethersProvider.provider,
    //ethProvider: ethersProvider,
    namespace: "CyberConnect",
    env: Env.STAGING,
  });


  console.log(cyberConnect);

  let addressToFollow = "0xxxxxxxxxx";
  addressToFollow = g_account;
  console.log(addressToFollow);
  try {
    cyberConnect.connect(addressToFollow);
  } catch (e) {
    console.log(e);
    return;
  }
  console.log("ok!");
}

const isMetaMaskConnected = () => g_account && g_account.length > 0;

async function enableMyAccount() {
  try {
    const _accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return _accounts[0] || null;
  } catch (error) {
    console.error(error);
  }
  return null;
}

async function findMyAccount() {
  try {
    const _accounts = await ethereum.request({
      method: "eth_accounts",
    });
    return _accounts[0] || null;
  } catch (err) {
    console.error(err);
  }
  return null;
}

//y();
console.log("end");

/*

async function x() {

  const coinbase = await web3.eth.getCoinbase();
  if (!coinbase) {
    window.alert('Please activate MetaMask first.');
    return;
  }

  const addressToFollow = coinbase; //'0x000000000...';

  let web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
  });

  const modalProvider = await web3Modal.connect();
  const ethersProvider = new Web3Provider(modalProvider);

  const cyberConnect = new CyberConnect({
    ethProvider: ethersProvider.provider,
    namespace: 'CCTwitter',
    env: Env.STAGING
  });

  // Follow
  try {
    cyberConnect.connect(addressToFollow);
  } catch (e) {
    console.log(e)
  }

  // Unfollow
  try {
    cyberConnect.disconnect(addressToFollow);
  } catch (e) {
    console.log(e)
  }
*/
/*

  
  
  // Follow
  try {
    cyberConnect.connect(addressToFollow);
  } catch (e) {
    console.log(e)
  }
  
  // Unfollow
  try {
    cyberConnect.disconnect(addressToFollow);
  } catch (e) {
    console.log(e)
  }
  */

/*
  await cyberConnect.authenticate();
  
  cyberConnect.connect(targetAddr, alias); //The target wallet address to connect.
  cyberConnect.disconnect(targetAddr);
  cyberConnect.setAlias(targetAddr, alias);
  
}
*/
//x();
