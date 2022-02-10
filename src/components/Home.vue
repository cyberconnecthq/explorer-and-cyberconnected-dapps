<template>
  <v-container class="fill-height main-body">
    <v-row>
      <v-col cols="6">
        <div class="display-3 font-weight-black spacing">
          START TO EXPLORE
          <br />
          <span class="topal">WEB3</span> NOW
        </div>
        <div class="body-1 mt-3">
          CyberConnect is the world's first decentralized social
          <br />
          graph protocol that aims to liberate social connections
          <br />
          on Web3
        </div>
        <v-btn
          class="btn-style mt-8"
          color="error"
          dark
          x-large
          @click="focusSearchBar"
        >
          Search Address
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({}),
  methods: {
    focusSearchBar() {
      if (
        this.$route.query.focused === true ||
        this.$route.query.focused === 'true'
      ) {
        return;
      }
      this.$router.push({
        name: 'home',
        query: { focused: true },
      });
    },
  },
};
</script>

<style scoped>
.main-body {
  padding-right: 15vw !important;
  padding-left: 15vw !important;
  max-width: unset !important;
  background-image: url('../assets/bg.svg') !important;
  background-position: right center;
}

.topal {
  color: #26d4ab;
}

.spacing {
  line-height: 120%;
  letter-spacing: 2px !important;
}

.btn-style {
  text-transform: unset !important;
  background: linear-gradient(
    54deg,
    rgba(30, 179, 221, 1) 0%,
    rgba(32, 194, 197, 1) 44%,
    rgba(34, 209, 176, 1) 100%
  ) !important;
  box-shadow: 5px -5px 12px #27264e, -5px 5px 12px #27264e;
}
</style>
