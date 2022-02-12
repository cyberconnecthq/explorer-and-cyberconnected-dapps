<template>
  <v-app>
    <notifications group="foo" />
    <v-app-bar class="app_bar_margin" app color="primary" dark elevation="0">
      <v-app-bar-nav-icon @click="goHome">
        <v-img
          max-height="30"
          max-width="30"
          src="https://app.cyberconnect.me/assets/logo-white.svg"
        />
      </v-app-bar-nav-icon>
      <v-app-bar-title> CyberConnect </v-app-bar-title>
      <v-text-field
        ref="tField"
        v-model="address"
        filled
        flat
        solo
        hide-details="true"
        dense
        placeholder="Search address"
        append-icon="mdi-magnify"
        :background-color="inputbg"
        @mouseenter="hover(true)"
        @mouseleave="hover(false)"
        @keypress="search"
        @blur="leaveFocus"
      />
    </v-app-bar>

    <v-main class="main_class">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { isValid } from './functions';

export default {
  name: 'App',

  data: () => ({
    inputbg: '#25252f',
    address: '',
  }),
  methods: {
    hover(val) {
      if (val) {
        this.inputbg = '#39394b';
      } else {
        this.inputbg = '#25252f';
      }
    },
    search(evt) {
      if (evt.code === 'Enter') {
        let rez = isValid(this.address);
        if (rez === false) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'The searched address is invalid!',
            type: 'error',
          });
        } else {
          this.$router.push({
            name: 'search',
            params: {
              address: this.address,
            },
          });
        }
      }
    },
    leaveFocus() {
      if (this.isFocused === false) {
        return;
      }
      this.$router.push({
        name: 'home',
      });
    },
    goHome() {
      this.$router.push({
        name: 'home',
      });
    },
  },
  computed: {
    isFocused() {
      return (
        this.$route.query.focused === true ||
        this.$route.query.focused === 'true'
      );
    },
  },
  watch: {
    isFocused(val) {
      if (val === true) {
        this.$refs.tField.$refs.input.focus();
      } else {
        this.$refs.tField.$refs.input.blur();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.focused === 'true') {
        this.$refs.tField.$refs.input.focus();
      }
    });
  },
};
</script>

<style scoped>
.main_class {
  background-color: #21212d;
}

.app_bar_margin {
  margin-left: 15vw;
  margin-right: 15vw;
}

.v-toolbar__title {
  padding-left: 0px !important;
  margin-right: 15vw;
}
</style>

<style>
.v-app-bar-title__content {
  overflow: auto !important;
  width: unset !important;
}

.v-input {
  border-radius: 0px !important;
}

/* .v-input::after,
.v-input::before,
.v-input__control::after,
.v-input__control::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: #b4b4bb;
  transition: 1s;
  mix-blend-mode: hue;
} */

.v-input:before {
  top: -2px;
  left: -2px;
}
.v-input:after {
  top: -2px;
  right: -2px;
}
.v-input__control:before {
  bottom: -2px;
  left: -2px;
}
.v-input__control:after {
  bottom: -2px;
  right: -2px;
}

.v-input:hover:before,
.v-input:hover:after,
.v-input:hover .v-input__control:before,
.v-input:hover .v-input__control:after {
  width: 30px;
  height: 20px;
}
</style>
