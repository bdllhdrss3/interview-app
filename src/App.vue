<template>
  <v-app>
    <SnackBar top  absolute :show="show" :message="message" :color="color" />
    <v-progress-linear v-if="loading" color="deep-purple accent-4" absolute indeterminate rounded height="10">
    </v-progress-linear>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import SnackBar from "@/components/snack-bar.vue"
export default {
  name: 'App',
  components: {SnackBar},
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      loading: "auth/GET_AUTH_LOADING",
      snackBarData: "auth/GET_SNACK_BAR"
    }),
    show() {
      return this.snackBarData.showSnackbar
    },
    message() {
      return this.snackBarData.message
    },
    color() {
      return this.snackBarData.color
    }
  }
}
</script>
