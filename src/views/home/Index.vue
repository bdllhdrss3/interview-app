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
import DataTable from '@/components/DataTable';
import authenticated from '@/mixins/authenticated';

export default {
  name: 'App',
  mixins: [authenticated],
  components: {
    DataTable,
  },

  data: () => ({
    //
  }),
};
</script>
