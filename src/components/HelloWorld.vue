<template>
  <div >
    Identity: {{identity}}

    <v-data-table
      :headers="headers"
      :items="followers"
      :options.sync="options"
      :server-items-length="totalFollowers"
      :loading="loading"

      ></v-data-table>
      Followers:
      <ul>
        <li v-for="(item, index) in followers" :key="item.address">
         {{index}} -- {{item.address}} --- {{item.domain}} !!! {{item.mutual}}
        </li>
      </ul>
      Followings:
      <ul>
        <li v-for="(item, index) in followings" :key="item.address">
         {{index}} -- {{item.address}} --- {{item.domain}} !!! {{item.mutual}}
        </li>
      </ul>
      Friends:
       <ul>
        <li v-for="(item, index) in friends" :key="item.address">
         {{index}} -- {{item.address}} --- {{item.domain}} 
        </li>
      </ul>
      Recommendations reason
      <ul>
        <li v-for="(item, index) in recommendations" :key="item.address">
          {{index}} -- {{item.address}} --- {{item.recommendationReason}}
        </li>
      </ul>
  </div>
</template>

<script>


import * as myModule from "../functions.js"
export default {
  name: 'HelloWorld',
  data() {
    return {
      address: "0x148d59faf10b52063071eddf4aaf63a395f2d41c",
      identity: '',
      totalFollowers: 0,
      followers: [],
      followings: [],
      recommendations: [],
      friends: [],
      options: {},
      loading: true,
      headers: [
        {
          text: 'Address',
          align: 'start',
          value: 'follower'
        },
        {
          text: 'Domain',
          value: 'domain'
        }
      ],
     
    }
  },
  watch:{
    followers: {
      deep: true,
      handler(){
        console.log("Followers has changed")
      }
    }
  },
  methods: {
   
  },
  async mounted() {
  /*
     myModule.identityQuery("0x148d59faf10b52063071eddf4aaf63a395f2d41c", 10,1).then(response =>{
        console.log("Returned:",response)
        this.followers = response.identity.followers.list
        this.followings = response.identity.followings.list
        this.friends = response.identity.friends.list
        this.followers = myModule.assignMutualConnections(this.address,this.followers)
        this.followings = myModule.assignMutualConnections(this.address,this.followings)
     
        
     }) 

    
    myModule.recommendationQuery("0x148d59faf10b52063071eddf4aaf63a395f2d41c", "SOCIAL", 10,1).then(response =>{
      if (response != null)
        this.recommendations = response.recommendations.data.list
    })

    console.log(myModule.isValid("0x148d59faf10b52063071eddf4aaf63a395f2d41c"))
    myModule.getBalance("0x148d59faf10b52063071eddf4aaf63a395f2d41c")
    */
   

    //myModule.getBalance("0x148d59faf10b52063071eddf4aaf63a395f2d41c")
    //myModule.getETHTransactions("0x63a9975ba31b0b9626b34300f7f627147df1f526")
    //console.log(res.data.result)
    //myModule.getERC20Tokens("0x63a9975ba31b0b9626b34300f7f627147df1f526")
    //myModule.getNFTTokens("0x148d59faf10b52063071eddf4aaf63a395f2d41c")

    //myModule.getPoapTokens("0x983110309620d911731ac0932219af06091b6744", "SOCIAL")
    myModule.createUniqueList("0x983110309620d911731ac0932219af06091b6744")
  }
  
    
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
