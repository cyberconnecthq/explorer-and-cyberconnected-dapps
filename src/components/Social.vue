<template>
  <v-container class="fill-height main-body pt-12" id="renderContainer">
    <v-row justify="space-between">
      <v-col cols="3">
        <!-- user card -->
        <div style="position: relative">
          <v-card
            ref="cardref"
            id="cardid"
            color="#1e1e29"
            class="rotated-card"
            elevation="12"
          >
            <div class="no-rotation">
              <!-- avatar -->
              <v-row align="center">
                <v-avatar
                  size="8vw"
                  class="avatar-style"
                  v-if="identity.avatar !== undefined && identity.avatar !== ''"
                >
                  <img alt="Avatar" :src="identity.avatar" />
                </v-avatar>
                <v-avatar size="8vw" class="avatar-style" v-else>
                  <img src="https://images.cybertino.io/cyberconnect_logo" />
                </v-avatar>
              </v-row>

              <!-- nume -->
              <v-row justify="center">
                <div
                  style="color: #41c8fb; overflow-wrap: anywhere"
                  :class="cardtext.title"
                >
                  {{ identity.domain }}
                </div>
              </v-row>

              <!-- data inregistrare -->
              <v-row justify="center">
                <div class="caption font-weight-light grey--text">
                  Since {{ formatDate(identity.joinTime) }}
                </div>
              </v-row>

              <!-- follower info -->
              <v-row justify="center" class="follow-row">
                <v-col class="center-column column-left" cols="6">
                  <v-row>
                    <v-col cols="12" class="no-pad-bottom no-pad-horizontal">
                      <div :class="cardtext.follow">
                        {{ identity.followingCount }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="no-pad-top no-pad-horizontal">
                      <div
                        class="font-weight-light grey--text"
                        :class="cardtext.follow"
                      >
                        Following
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-divider vertical class="divider-style" />
                <v-col class="center-column column-right" cols="6">
                  <v-row>
                    <v-col cols="12" class="no-pad-bottom no-pad-horizontal">
                      <div :class="cardtext.follow">
                        {{ identity.followerCount }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="no-pad-top no-pad-horizontal">
                      <div
                        class="font-weight-light grey--text"
                        :class="cardtext.follow"
                      >
                        Followers
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <!-- adresa eth -->
              <div class="mt-6 mb-6">
                <div
                  class="font-weight-light grey--text mb-2"
                  :class="cardtext.address"
                >
                  Address
                </div>
                <div :class="cardtext.address">
                  {{ identity.address }}
                </div>
              </div>

              <!-- networks -->
              <v-row class="mb-12">
                <v-btn
                  color="#1d9bf0"
                  :href="twitterAcc.url"
                  target="_blank"
                  rounded
                  v-if="twitterAcc !== null"
                >
                  <v-icon left> mdi-twitter </v-icon>
                  @{{ twitterAcc.acc }}
                </v-btn>
              </v-row>
            </div>
          </v-card>
          <!-- card background -->
          <v-card
            elevation="12"
            :style="{
              width: cardwidth,
              height: cardheight,
              top: cardtop,
              left: cardleft,
            }"
            class="background-card"
          />
        </div>

        <v-switch
          v-if="loading === false"
          v-model="graphView"
          inset
          class="mt-12"
          label="Graph view"
          color="red"
          style="position: relative; z-index: 1"
        />
        <div v-else class="mt-12">Loading more connections...</div>
      </v-col>

      <!-- connections table -->
      <v-col cols="8" v-if="graphView === false">
        <v-radio-group
          v-model="radio"
          row
          dark
          style="position: relative; z-index: 2"
        >
          <v-radio
            label="All"
            value="all"
            :color="radio === 'all' ? 'red' : ''"
          />
          <v-radio
            label="Followers"
            value="followers"
            :color="radio === 'followers' ? 'red' : ''"
          ></v-radio>
          <v-radio
            label="Following"
            value="following"
            :color="radio === 'following' ? 'red' : ''"
          />
          <v-radio
            label="Mutual"
            value="mutual"
            :color="radio === 'mutual' ? 'red' : ''"
          />
          <v-radio
            label="ETH"
            value="eth"
            :color="radio === 'eth' ? 'red' : ''"
          />
          <v-radio
            label="ERC20"
            value="erc20"
            :color="radio === 'erc20' ? 'red' : ''"
          />
          <v-radio
            label="NFT"
            value="nft"
            :color="radio === 'nft' ? 'red' : ''"
          />
        </v-radio-group>
        <v-data-table
          :items="filteredItems"
          class="connections-table"
          :footer-props="{ 'items-per-page-options': [5, 10, 15] }"
        >
          <template v-slot:item="{ item }">
            <v-card
              class="mb-6 connection-card pt-4 pb-4 pl-6 pr-6"
              elevation="0"
              @click="changeAddress(item.address)"
            >
              <v-row justify="space-between" class="c-row">
                <v-col cols="1">
                  <v-avatar
                    size="4vw"
                    v-if="item.avatar !== undefined && item.avatar !== ''"
                  >
                    <img alt="Avatar" :src="item.avatar" />
                  </v-avatar>
                  <v-avatar size="4vw" v-else>
                    <img src="https://images.cybertino.io/cyberconnect_logo" />
                  </v-avatar>
                </v-col>
                <v-col cols="10">
                  <div class="text-h6" style="color: #41c8fb">
                    {{ item.domain }}
                  </div>
                  <div class="text-caption font-weight-light">
                    {{ item.address }}
                  </div>
                  <div
                    class="caption font-weight-light grey--text"
                    v-if="
                      item.lastModifiedTime !== '' &&
                      item.lastModifiedTime !== undefined
                    "
                  >
                    Last modified: {{ formatDate(item.lastModifiedTime) }}
                  </div>
                  <div
                    class="caption font-weight-light grey--text"
                    v-if="item.isRecommended === true"
                  >
                    {{ item.recommendationFilter }} recommendation:
                    {{ item.recommendationReason }}
                  </div>
                  <div
                    class="caption font-weight-light grey--text"
                    v-if="item.followerCount !== undefined"
                  >
                    Followers: {{ item.followerCount }}
                  </div>

                  <div class="mt-3">
                    <!-- CyberConnect relation -->
                    <v-tooltip bottom v-if="item.namespace === 'CyberConnect'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="primary"
                          style="float: right"
                          :href="`https://app.cyberconnect.me/address/${item.address}`"
                          target="_blank"
                        >
                          <v-avatar size="32px">
                            <img
                              src="https://images.cybertino.io/cyberconnect_logo"
                            />
                          </v-avatar>
                        </v-btn>
                      </template>
                      <span>
                        Connection on CyeberConnect: <br />
                        {{
                          `https://app.cyberconnect.me/address/${item.address}`
                        }}
                      </span>
                    </v-tooltip>
                    <!-- Follower relation-->
                    <v-tooltip
                      bottom
                      v-if="
                        item.isFollower === true && item.isFollowing === false
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="red"
                          style="float: right"
                        >
                          <v-icon> mdi-cards-heart-outline </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ item.address }} <br />
                        is following<br />
                        {{ identity.address }}
                      </span>
                    </v-tooltip>
                    <!-- Following relation-->
                    <v-tooltip
                      bottom
                      v-if="
                        item.isFollower === false && item.isFollowing === true
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="yellow"
                          style="float: right"
                        >
                          <v-icon color="black">mdi-walk </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ identity.address }}<br />
                        is following <br />
                        {{ item.address }}
                      </span>
                    </v-tooltip>
                    <!-- Mutual relation-->
                    <v-tooltip
                      bottom
                      v-if="
                        item.isFollower === true && item.isFollowing === true
                      "
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="blue"
                          style="float: right"
                        >
                          <v-icon>mdi-handshake-outline </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ identity.address }} <br />
                        and<br />
                        {{ item.address }}<br />
                        are following each other
                      </span>
                    </v-tooltip>
                    <!-- Recommended -->
                    <v-tooltip bottom v-if="item.isRecommended === true">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="purple"
                          style="float: right"
                        >
                          <v-icon>mdi-plus-circle-multiple-outline </v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ item.address }}<br />
                        is a recommendation
                      </span>
                    </v-tooltip>
                    <!-- ETH transaction -->
                    <v-tooltip bottom v-if="item.hasETHTransaction === true">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="#a4fcf5"
                          style="float: right"
                        >
                          <v-icon color="black"> mdi-ethereum</v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ identity.address }}<br />
                        and<br />
                        {{ item.address }}<br />
                        transacted ETH
                      </span>
                    </v-tooltip>
                    <!-- NFT transaction -->
                    <v-tooltip bottom v-if="item.hasNFTTransaction === true">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="#f30cbd"
                          style="float: right"
                        >
                          <v-icon> mdi-nativescript</v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ identity.address }}<br />
                        and<br />
                        {{ item.address }}<br />
                        transacted a NFT
                      </span>
                    </v-tooltip>
                    <!-- ERC20 transaction -->
                    <v-tooltip bottom v-if="item.hasERC20Token === true">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            (evt) => {
                              evt.stopPropagation();
                            }
                          "
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          fab
                          dark
                          x-small
                          color="#ba9f33"
                          style="float: right"
                        >
                          <v-icon color="black"> mdi-dog</v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ identity.address }}<br />
                        and<br />
                        {{ item.address }}<br />
                        transacted an ERC20 token
                      </span>
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as social from '../functions.js';
import Graph from 'graphology';
import Sigma from 'sigma';
import ForceSupervisor from 'graphology-layout-force/worker';

export default {
  data() {
    return {
      cardwidth: '0px',
      cardheight: '0px',
      cardleft: '0px',
      cardtop: '0px',
      resizeObserver: null,
      repositionObserver: null,
      identity: {},
      connections: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      radio: 'all',
      filterRule: '',
      graphView: false,
      loading: false,
      renderer: null,
      graph: null,
      container: null,
    };
  },

  methods: {
    cardresize() {
      this.cardwidth = `${this.$refs['cardref'].$el.clientWidth}px`;
      this.cardheight = `${this.$refs['cardref'].$el.clientHeight}px`;
    },
    cardreposition() {
      this.cardleft = `${this.$refs['cardref'].$el.offsetLeft}px`;
      this.cardtop = `${this.$refs['cardref'].$el.offsetTop}px`;
    },
    async getIdentity() {
      this.graphView = false;
      this.radio = 'all';
      let adr = this.$route.params.address;
      let resp = await social.identityQuery(adr, 50, 1);
      this.identity = resp.identity;
      this.connections = this.identity.followers.list;
      this.loading = true;
      let list1 = await social.createUniqueList(adr);
      this.loading = false;
      this.connections = list1;
    },
    formatDate(date) {
      const d = new Date(date);
      const m = this.months[d.getMonth()];
      return `${m} ${d.getDate()}, ${d.getFullYear()}`;
    },
    changeAddress(newAddress) {
      this.$router.push({
        name: 'search',
        params: {
          address: newAddress,
        },
      });
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    buildGraph() {
      this.graph.addNode('n1', {
        x: 0,
        y: 0,
        size: 30,
        color: 'red',
        label:
          this.identity.domain !== '' && this.identity.domain !== undefined
            ? this.identity.domain
            : this.identity.address,
      });

      let l = this.connections.length;
      for (let i = 0; i < l; i++) {
        if (this.connections[i].address === this.identity.address) {
          continue;
        }

        let item = this.connections[i];
        let color = 'green';
        let label =
          this.connections[i].domain !== '' &&
          this.connections[i].domain !== undefined
            ? this.connections[i].domain
            : this.connections[i].address;

        if (item.isFollower === true && item.isFollowing === true) {
          color = 'blue';
          label += '[mutual following]';
        }

        if (item.isFollower === true && item.isFollowing === false) {
          color = 'yellow';
          label += '[follower]';
        }

        if (item.isFollower === false && item.isFollowing === true) {
          color = 'purple';
          label += '[following]';
        }

        if (item.hasETHTransaction === true) {
          color = 'grey';
          label += '[transacted eth]';
        }

        if (item.hasNFTTransaction === true) {
          color = 'pink';
          label += '[transacted nft]';
        }

        if (item.hasERC20Token === true) {
          color = 'orange';
          label += '[transacted erc20]';
        }
        // `n${i + 2}`
        this.graph.addNode(`${this.connections[i].address}`, {
          size: 7,
          x: this.getRndInteger(-300, 300),
          y: this.getRndInteger(-300, 300),
          label: label,
          color: color,
        });
        // if (l < 300) {
        //   this.graph.addEdge('n1', `${this.connections[i].address}`);
        // }
      }
    },
  },
  computed: {
    cardtext() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return {
            title: 'text-body-1',
            address: 'text-caption',
            follow: 'text-caption',
          };
        case 'sm':
          return {
            title: 'text-h6',
            address: 'text-caption',
            follow: 'text-body-2',
          };
        case 'md':
          return {
            title: 'text-h5',
            address: 'text-caption',
            follow: 'text-body-1',
          };
        case 'lg':
          return {
            title: 'text-h4',
            address: 'text-caption',
            follow: 'text-subtitle-2',
          };
        case 'xl':
          return {
            title: 'text-h4',
            address: 'text-body-2',
            follow: 'text-subtitle-1',
          };
      }
      return 0;
    },
    twitterAcc() {
      if (this.identity === undefined) {
        return null;
      }

      if (this.identity.social === undefined || this.identity.social === '') {
        return null;
      }

      if (
        this.identity.social.twitter === '' ||
        this.identity.social.twitter === undefined
      ) {
        return null;
      }

      return {
        acc: this.identity.social.twitter,
        url: 'https://twitter.com/' + this.identity.social.twitter,
      };
    },
    currentAddress() {
      return this.$route.params.address;
    },
    filteredItems() {
      if (this.radio === 'all') {
        return this.connections;
      }

      if (this.radio === 'followers') {
        return this.connections.filter(
          (item) => item.isFollower === true && item.isFollowing === false
        );
      }

      if (this.radio === 'following') {
        return this.connections.filter(
          (item) => item.isFollowing === true && item.isFollower === false
        );
      }

      if (this.radio === 'mutual') {
        return this.connections.filter(
          (item) => item.isFollowing === true && item.isFollower === true
        );
      }

      if (this.radio === 'eth') {
        return this.connections.filter(
          (item) => item.hasETHTransaction === true
        );
      }

      if (this.radio === 'nft') {
        return this.connections.filter(
          (item) => item.hasNFTTransaction === true
        );
      }

      if (this.radio === 'erc20') {
        return this.connections.filter((item) => item.hasERC20Token === true);
      }

      return this.connections;
    },
  },
  watch: {
    currentAddress() {
      this.getIdentity();
    },
    graphView(newVal) {
      if (newVal === true) {
        this.buildGraph();
      } else if (newVal === false) {
        this.renderer.graph.clear();
        this.renderer.refresh();
      }
    },
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.cardresize);
    this.resizeObserver.observe(document.getElementById('cardid'));
    this.cardresize();
    this.cardreposition();
    window.onresize = this.cardreposition;

    //init graph
    this.container = document.getElementById('renderContainer');
    this.graph = new Graph();
    this.renderer = new Sigma(this.graph, this.container, {
      renderEdgeLabels: true,
      defaultLabelColor: '#fff',
    });

    let draggedNode = null;
    let isDragging = false;

    this.renderer.on(
      'clickNode',
      function (e) {
        if (e.node !== 'n1') {
          this.$router.push({
            name: 'search',
            params: {
              address: e.node,
            },
          });
        }
      }.bind(this)
    );

    this.renderer.on('downNode', (e) => {
      isDragging = true;
      draggedNode = e.node;
      this.graph.setNodeAttribute(draggedNode, 'highlighted', true);
      this.renderer.getCamera().disable();
    });

    // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
    this.renderer.getMouseCaptor().on('mousemovebody', (e) => {
      if (!isDragging || !draggedNode) return;

      // Get new position of node
      const pos = this.renderer.viewportToGraph(e);

      this.graph.setNodeAttribute(draggedNode, 'x', pos.x);
      this.graph.setNodeAttribute(draggedNode, 'y', pos.y);
    });

    // On mouse up, we reset the autoscale and the dragging mode
    this.renderer.getMouseCaptor().on('mouseup', () => {
      if (draggedNode) {
        this.graph.removeNodeAttribute(draggedNode, 'highlighted');
      }
      isDragging = false;
      draggedNode = null;
      this.renderer.getCamera().enable();
    });

    // Disable the autoscale at the first down interaction
    this.renderer.getMouseCaptor().on('mousedown', () => {
      if (!this.renderer.getCustomBBox())
        this.renderer.setCustomBBox(this.renderer.getBBox());
    });

    const layout = new ForceSupervisor(this.graph, {
      isNodeFixed: (_, attr) => attr.highlighted,
    });
    layout.start();
  },
  created() {
    this.getIdentity();
  },
  beforeUnmount() {
    this.resizeObserver.unobserve(document.getElementById('cardid'));
  },
};
</script>

<style scoped>
.main-body {
  padding-right: 15vw !important;
  padding-left: 15vw !important;
  max-width: unset !important;
}

.no-rotation {
  transform: rotate(-3deg);
}

.rotated-card {
  transform: rotate(3deg);
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 12px;
  z-index: 2;
}

.avatar-style {
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
}

.center-column {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #292b3a;
  text-align: center;
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.column-right {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.column-left {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.follow-row {
  margin-top: 35px !important;
  margin-bottom: 10px;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.divider-style {
  border-color: #1e1e29 !important;
  z-index: 1;
  margin-bottom: 8px;
  margin-top: 8px;
}

.no-pad-top {
  padding-top: 0 !important;
}
.no-pad-bottom {
  padding-bottom: 0 !important;
}
.no-pad-horizontal {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.background-card {
  background: linear-gradient(
    201deg,
    rgba(68, 196, 253, 1) 0%,
    rgba(25, 172, 167, 1) 100%
  ) !important;
  position: absolute;
  z-index: 1;
  transform: rotate(-3deg);
}

.connections-table {
  background: #21212d !important;
}

.connection-card {
  background-color: #1e1e29 !important;
  border-radius: 0px !important;
  z-index: 1;
  margin: 2px;
}

.connection-card::after,
.connection-card::before,
.c-row::after,
.c-row::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: #353541;
  mix-blend-mode: hue;
  z-index: 0;
}

.connection-card:hover {
  background-color: #292b3a !important;
}

.connection-card:hover.connection-card::after,
.connection-card:hover.connection-card::before,
.connection-card:hover .c-row::after,
.connection-card:hover .c-row::before {
  background: white;
}

.connection-card:before {
  top: -2px;
  left: -2px;
}
.connection-card:after {
  top: -2px;
  right: -2px;
}
.c-row::before {
  bottom: -2px;
  left: -2px;
}
.c-row::after {
  bottom: -2px;
  right: -2px;
}

.activeBtn {
  color: red;
}
</style>