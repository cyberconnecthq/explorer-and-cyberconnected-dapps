import { BASIC_INFO, IDENTITY_QUERY } from './graphql/queries.js'
 import {  MUTUAL_FOLLOW_QUERY, RECOMMENDATION_QUERY, POAP_RECCOMENDATIONS } from './graphql/queries.js'

 import axios from 'axios'
 const web3 = require('web3')

  export function assignMutualConnections(fromAddr, followers){
    var newfollowers=[]
    followers.forEach(element => {
      mutualFollowQuery(fromAddr, element.address).then(response =>{
        element.mutual = response
        newfollowers.push(element)
      })
    });
   
    return newfollowers
  }

    async function axiosRequest(query, variables){
    try{
        var result = await axios({
            method: "POST",
            url:  "https://api.cybertino.io/connect/",
            data: {
                query: query,
                variables: variables
            },
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // "Access-Control-Request-Headers":"content-type",
                // "Access-Control-Request-Methods":"POST, OPTIONS",
                //"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                //no cors mode
                //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            }
        });
        return result.data.data
    } catch(error){
        return {}
    }
  }

  export async function identityQuery(address, itemsPerPage, page){
    const query = IDENTITY_QUERY
    const after = (page-1)*itemsPerPage -1
    
    const variables = {
        address: address,
        first: itemsPerPage,
        after: String(after)
    }
    var result = await axiosRequest(query, variables)
    if (result == {}) return result
    return result
   
  }

  export async function recommendationQuery(address, filter, itemsPerPage, page){
    const query = RECOMMENDATION_QUERY
    const after = (page-1)*itemsPerPage -1
    const variables = {
        address: address,
        filter: filter,
        first: itemsPerPage,
        after: String(after)
      }
      var result = await axiosRequest(query, variables)
      if (result == {}) return {}
      return result
  }

 async function mutualFollowQuery(fromAddr, toAddr){
    const query = MUTUAL_FOLLOW_QUERY
    const variables = {
        fromAddr: fromAddr,
        toAddr: toAddr
      }
    var result = await axiosRequest(query, variables)
    if (result == {}) return {}
    const isFollowed = result.followStatus.isFollowed
    const isFollowing = result.followStatus.isFollowing
    if (isFollowed == true && isFollowing==true){
        return true
      }
      return false
}

async function basicInfo(address){
    const query = BASIC_INFO
    const variables ={
        address: address
    }
    let result = await axiosRequest(query, variables)
    return result
}

export function isValid(address){
    let result = web3.utils.isAddress(address)
    return result
}

export async function getBalance(address){
    let params = {
        module: 'account',
        action: 'balance',
        address: address,
        tag: 'latest',
        apiKey: 'A1CIYWKZKTD4NTNH2MPRHE7Q9HNEYSKSP8'
    }
    const res = await axios.get("https://api.etherscan.io/api", {params: params})
    let eth = web3.utils.fromWei(res.data.result, "ether")
    return eth
}



export async function getETHTransactions(address){
    let params = {
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        apiKey: 'A1CIYWKZKTD4NTNH2MPRHE7Q9HNEYSKSP8'
    }
    const res = await axios.get("https://api.etherscan.io/api", {params: params})
    return res.data.result
}

export async function getERC20Tokens(address){
    let params = {
        module: 'account',
        action: 'tokentx',
        address: address,
        apiKey: 'A1CIYWKZKTD4NTNH2MPRHE7Q9HNEYSKSP8'
    }
    const res = await axios.get("https://api.etherscan.io/api", {params: params})
    return res.data.result
}

export async function getNFTTokens(address){
    let params = {
        module: 'account',
        action: 'tokennfttx',
        address: address,
        apiKey: 'A1CIYWKZKTD4NTNH2MPRHE7Q9HNEYSKSP8'
    }
    const res = await axios.get("https://api.etherscan.io/api", {params: params})
    return res.data.result
}

function runTask(spec){
    return identityQuery(spec.address, spec.itemsPerPage, spec.page)
}

function getPoaps(spec){
    return getPoapRecommendation(spec.eventId)
}

export async function getPoapTokens(address){
    let poapList = []
    let api = "http://api.poap.xyz/actions/scan/" + address
    const res = await axios.get(api)
    res.data.forEach(element => getPoapRecommendation(element.event.id))
    //getPoapRecommendation("21917")
    console.log("User poaps: ",res)
    let thingsToDo = []
    res.data.forEach(element => {
        thingsToDo.push({eventId: element.event.id})
        
    })
   
    let chunck=10
    var i
 
    if (thingsToDo.length > 0){
        chunck = 10
    } else {
        chunck = thingsToDo.length
    }
   
    for (i=0; i<thingsToDo.length; i += chunck) {
        let temp = thingsToDo.slice(i, i+chunck)
        let tasks = temp.map(getPoaps)
        let results = await Promise.all(tasks)
        results.forEach(result => {
            poapList = poapList.concat(result)
        })
    }
    poapList = [...new Set(poapList)]
    return poapList
}

export async function getPoapRecommendation(eventID){
    //var recList = []
    const query = POAP_RECCOMENDATIONS
    const variables ={
        id: eventID
    }
    try{
        var result = await axios({
            method: "POST",
            url:  "https://api.thegraph.com/subgraphs/name/poap-xyz/poap",
            data: {
                query: query,
                variables: variables
            },
        });
      
        var recList = []
        let reccs = result.data.data.event
        if (reccs != null){
            reccs.tokens.forEach(token =>{
                recList.push(token.owner.id)
            })
        }
       
        return recList
    } catch(error){
        console.log(error)
        return {}
    }
}

function createElement(address, field, element=null){
    let newElem = {}
    newElem.isFollowing = false
    newElem.isFollower = false
    newElem.isRecommended = false
    newElem.hasERC20Token = false
    newElem.hasETHTransaction = false
    newElem.hasNFTTransaction = false
    newElem.hasSamePoap = false
    switch(field){
        case 'isFollowing': 
        if (element != null){
            newElem.address = element.address
            newElem.alias = element.alias
            newElem.avatar = element.avatar
            newElem.domain = element.domain
            newElem.namespace = element.namespace
            newElem.lastModifiedTime = element.lastModifiedTime
        }
            newElem.isFollowing = true
            break;
        case 'isRecommended':
            newElem.address = element.address
            newElem.avatar = element.avatar
            newElem.domain = element.domain
            newElem.isRecommended = true
            newElem.followerCount = element.followerCount
            newElem.recommendationReason = element.recommendationReason
            newElem.recommendationFilter = element.recommendationFilter
            break;
        case 'hasETHTransaction':
            newElem.address = address
            newElem.hasETHTransaction = true
            break;
        case 'hasERC20Token':
            newElem.address = address
            newElem.hasERC20Token = true
            newElem.Token = element
            break;
        case 'hasNFTTransaction':
            newElem.address = address
            newElem.hasNFTTransaction = true
            break;
        case 'hasSamePoap':
            newElem.address = address
            newElem.hasSamePoap = true
        
    }
   return newElem
}


export async function getRecommendationList(address, filter){
    let itemsPerPage = 50
    let after = 1
    //let data = ""
    let reccList = []
    let hasNext = true

    while (hasNext){
        let results = await recommendationQuery(address, filter, itemsPerPage, after)
        let data = results.recommendations.data
        if (data != null){
            reccList = reccList.concat(data.list)
            hasNext = data.pageInfo.hasNextPage
            after = after + 1
        }
        else hasNext = false
    }
    return reccList

}


export async function getAllRecommendations(address){
    let final_list = []
    let social = await getRecommendationList(address, "SOCIAL")
    social = social.map(obj => ({ ...obj, recommendationFilter: "SOCIAL"}))
    let game = await getRecommendationList(address, "GAME")
    game = game.map(obj => ({ ...obj, recommendationFilter: "GAME"}))
    let defi = await getRecommendationList(address, "DEFI")
    defi = defi.map(obj => ({ ...obj, recommendationFilter: "DEFI"}))
    let nft = await getRecommendationList(address, "NFT")
    nft = nft.map(obj => ({ ...obj, recommendationFilter: "NFT"}))
    final_list = final_list.concat(social)
    final_list = final_list.concat(game)
    final_list = final_list.concat(defi)
    final_list = final_list.concat(nft)

    return final_list
}

export async function createUniqueList(address){
    let result = await basicInfo(address)
    let followerCount = result.identity.followerCount
    console.log(result.identity.domain)
    console.log("followers: ",followerCount)
    let followingsCount = result.identity.followingCount
    console.log("followings: ",followingsCount)

    let followersList = []
    let followingsList = []
    let totalPages = 0
    let parseFollowers = true
    
    totalPages = Math.ceil(followerCount/50)
    let currentPage = 1
    let step =0
    console.log("total pages: ", totalPages)
    if (totalPages == 1)
        currentPage = 0
    while (currentPage < totalPages ){
        if (totalPages - currentPage >= 20){
            step = 20
        }
        else {
            step = totalPages - currentPage + 1
        }
        
        let asyncThingsTodo =[]
        for (let i=currentPage; i< currentPage + step; i++){
            asyncThingsTodo.push({address: address, itemsPerPage: 50, page:i})
        }
        let tasks = asyncThingsTodo.map(runTask)
        let res = await Promise.all(tasks )
        res.forEach(x => {
            if (parseFollowers){
                let newList = x.identity.followers.list.map(obj => ({...obj, isFollower: true, isFollowing: false, hasETHTransaction: false, hasNFTTransaction: false, hasERC20Token: false, isRecommended: false, hasSamePoap: false}))
                followersList = followersList.concat(newList)
                followingsList = followingsList.concat(x.identity.followings.list)
            }
            else {
                let newList = x.identity.followings.list.map(obj => ({...obj, isFollowing: true}))
                followingsList = followingsList.concat(newList)
                followersList = followersList.concat(x.identity.followers.list)
            
            }
            
           
            
        })
        currentPage = currentPage + step
     
    }
    
  
    followersList = await compare(followersList, followingsList,address, true, "cyberconnect")
 
    
    let recommendationsList = await getAllRecommendations(address)
    followersList = await compare(followersList, recommendationsList, address, false, "recommendations")
   
    
    followersList = removeDuplicates(followersList)
    

    let ethList = await getETHTransactions(address)
    followersList = await compare(followersList, ethList, address, false, "eth" )
    followersList = removeDuplicates(followersList)
   
    let erc20tokenList = await getERC20Tokens(address)
    followersList = await compare(followersList, erc20tokenList, address, false, "erc20token" )
    followersList = removeDuplicates(followersList)
    
    let nftTokens = await getNFTTokens(address)
    followersList = await compare(followersList, nftTokens, address, false, "nft")
    followersList = removeDuplicates(followersList)
  

    // let poapTokens = await getPoapTokens(address)
    // followersList = await compare(followersList, poapTokens, address, false, "poap")

    console.log("FINAL: ", followersList)
    console.log("follower count", followerCount)
    console.log("reccs: ", recommendationsList.length)
    console.log("eth list: ", ethList.length)
    console.log("erc20list: ", erc20tokenList.length)
    console.log("nft tokens: ", nftTokens.length)
    // console.log("poap tokens: ", poapTokens.length)
    
    
    return followersList
    
}

function searchAddress(spec){
    let platform = spec.action
    let array = spec.array
    if (platform == "cyberconnect" || platform == "recommendations"){
        let address = spec.address
        let elem = spec.followingElem
        let found = array.find(element => element.address === address)
        if (found){
            
            let foundElement = (element) => element.address == address
            let indexElement = array.findIndex(foundElement)
            return [indexElement, address, elem]
        }
        else 
            return [-1, address, elem]
    } else if (platform=="eth" || platform=="nft"){
        let from_address = spec.from
        let to_address = spec.to
        let original = spec.original
       
        let for_address = ''
        if (from_address==original){
            for_address = to_address
        }else {
            for_address = from_address
        }

        let found = array.find(element => element.address === for_address)
        
        let indexElement = -1 
        if (found){
            let foundElement = (element) => element.address == for_address
            indexElement = array.findIndex(foundElement)
            return [indexElement, for_address]
        } 
        return [-1, for_address]
    } else if (platform=="erc20token"){
        let address = spec.address
        let token = spec.token
        let found = array.find(element => element.address === address)
      
        if (found){
            let foundElement = (element) => element.address == address
            let indexElement = array.findIndex(foundElement)
            return [indexElement, address, token]
        }
        else 
            return [-1, address, token]
    } else if (platform == "poap"){
        let address = spec.address
        let found = array.find(element => element.address === address)
        if (found){
            let foundElement = (element) => element.address == address
            let indexElement = array.findIndex(foundElement)
            return [indexElement, address]
        } else {
            return [-1, address]
        }
    }
}

function removeDuplicates(arrayList){
    arrayList = arrayList.filter((value, index, self) =>
    index === self.findIndex((t) => (
        t.address === value.address
        ))
    )
    return arrayList
}

async function compare(followersArray, followingsArray, searchedAddress, followers, action){
  
    let processed = 0
    let step =0
    while (processed < followingsArray.length){
        {
            if (followingsArray.length - processed >= 20)
                step = 20
            else
                step = followingsArray.length - processed
        }
        let asyncThingsTodo = []
        for (let i=processed; i<processed + step;i++){
            if (action == 'cyberconnect' || action=="recommendations"){
                asyncThingsTodo.push({address: followingsArray[i].address, followingElem: followingsArray[i], array: followersArray, action: action})
            } else if (action == "eth" || action == "nft")  {
                asyncThingsTodo.push({from: followingsArray[i].from, to: followingsArray[i].to, original: searchedAddress, array: followersArray, action: action})
            } else if (action=="erc20token"){
                asyncThingsTodo.push({address: followingsArray[i].to, token: followingsArray[i].tokenName, array:followersArray, action:action})
            } else if (action == "poap"){
                asyncThingsTodo.push({address: followingsArray[i], array: followersArray, action:action})
            }
        }
        let tasks = asyncThingsTodo.map(searchAddress)
        let res = await Promise.all(tasks )
        res.forEach(x => {
                switch(action){
                    case "cyberconnect":
                        // 0- index 1-adresa 2-elementul din followings
                        if (x[0] != -1){
                            var updatedElem = followersArray[x[0]]
                            if (followers){
                                updatedElem.isFollowing = true
                            } else {
                                updatedElem.isFollower = true
                            }
                            followersArray[x[0]]= updatedElem
                            break;
                        } else {
                            let element = createElement(x[1], 'isFollowing', x[2])
                            followersArray.push(element)
                            break;
                        }
                    case "recommendations":
                        if (x[0] != -1){
                            let updatedElem = followersArray[x[0]]
                            updatedElem.isRecommended = true
                            updatedElem.recommendationReason = x[2].recommendationReason
                            updatedElem.followerCount = x[2].followerCount
                            updatedElem.recommendationFilter = x[2].recommendationFilter
                            followersArray[x[0]] = updatedElem
                            break
                        } else {
                            let element = createElement(x[1], 'isRecommended', x[2])
                            followersArray.push(element)
                            break
                        }

                    case "eth":
                        if (x[0] != -1){
                            updatedElem = followersArray[x[0]]
                            updatedElem.hasETHTransaction = true
                            followersArray[x[0]]= updatedElem
                            break;
                        } else {
                            let element = createElement(x[1], 'hasETHTransaction')
                            followersArray.push(element)
                            break;
                        }
                    case "nft":
                        if (x[0] != -1){
                            updatedElem = followersArray[x[0]]
                            updatedElem.hasNFTTransaction = true
                            followersArray[x[0]]= updatedElem
                            break;
                        } else {
                            let element = createElement(x[1], 'hasNFTTransaction')
                            followersArray.push(element)
                            break;
                        }
                    case "erc20token":
                        
                        if (x[0] != -1){
                            updatedElem = followersArray[x[0]]
                            updatedElem.hasERC20Token = true
                            updatedElem.token = x[2]
                            followersArray[x[0]]= updatedElem
                            break;
                        } else {
                            let element = createElement(x[1], 'hasERC20Token', x[2])
                            followersArray.push(element)
                            break;
                        }
                    case "poap":
                        if (x[0] != -1){
                            console.log("update with poap: ", x[0])
                            updatedElem = followersArray[x[0]]
                            updatedElem.hasSamePoap = true
                            followersArray[x[0]] = updatedElem
                            break;
                        } else {
                            console.log("create new Poap connection")
                            let newElem = createElement(x[1], 'hasSamePoap')
                            followersArray.push(newElem)
                        }
                }
            
        })
        processed = processed + step
    } 
    return followersArray
}
