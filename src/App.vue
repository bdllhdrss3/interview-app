<template>
  <v-app>
    <v-app-bar app color="primary" dark>
    </v-app-bar>

    <v-main>
      <DataTable />
    </v-main>
  </v-app>
</template>

<script>
import DataTable from './components/DataTable';

export default {
  name: 'App',

  components: {
    DataTable,
  },

  data: () => ({
    //
  }),
};
</script>
