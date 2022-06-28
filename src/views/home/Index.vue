<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Shipments App</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title>{{user.username}}</v-toolbar-title>

      <v-menu right bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="ml-1 mr-10 px-2">

            <v-icon class="mx-1">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Log Out
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <DataTable />
    </v-main>
  </v-app>
</template>

<script>
import DataTable from '@/components/DataTable';
import authenticated from '@/mixins/authenticated';
import { mapMutations, mapGetters } from "vuex";
export default {
  name: 'App',
  mixins: [authenticated],
  components: {
    DataTable,
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapMutations({
      SET_AUTH_SUCCESS: "auth/SET_AUTH_SUCCESS",
      SET_LOADING: "auth/SET_AUTH_LOADING",
      SET_SNACK_BAR: "auth/SET_SNACK_BAR "
    }),

    logout() {
      this.SET_AUTH_SUCCESS({ email: '', username: '', uuid: '', token: '', refresh: ''});
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.$router.push("/login")
    }
  },
  computed: {
    ...mapGetters({
    user: "auth/GET_USER"
  }),
}
};
</script>
