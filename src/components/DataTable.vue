<template>
  <v-container>
    <v-card class="mt-10">
      <v-card-title>
        Shipments
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" width="100" single-line></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="shipments" :search="search" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  New Shipment
                </v-btn>
              </template>
              <v-card>
                <v-progress-linear v-if="modifyLoading" color="deep-purple accent-4" absolute indeterminate rounded
                  height="10">
                </v-progress-linear>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.package_name" label="Package Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.shipping_date" type="date" :value="today"
                          label="Shipping date">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.arrival_date" type="date" :value="today" label="Arrival date">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.destination_country" label="Country of origin">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.country_of_origin" label="Destination country">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select :items="status" v-model="editedItem.status" label="Status"></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="green darken-1" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-progress-linear v-if="modifyLoading" color="deep-purple accent-4" absolute indeterminate rounded
                  height="10">
                </v-progress-linear>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <div class="mx-5">
              <v-chip class="mx-2" color="blue" dark label>PD - Pending</v-chip>
              <v-chip class="mx-2" color="green" dark label>AD - Delivered</v-chip>
              <v-chip class="mx-2" color="red" dark label>OTW - On the way</v-chip>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]=" { item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" id="chips" label dark>
            {{ item.status }}
          </v-chip>
        </template>

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
  export default {
  data() {
    return {
      loading: false,
      search: '',
      dialog: false,
      dialogDelete: false,
      modifyLoading: false,
      
      headers: [
        {
          text: 'Package name',
          align: 'start',
          value: 'package_name',
        },
        { text: 'Shipping Date', value: 'shipping_date' },
        { text: 'Estimated arrival date', value: 'arrival_date' },
        { text: 'Country of origin', value: 'country_of_origin' },
        { text: 'Destination country', value: 'destination_country' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      shipments: [],
      editedIndex: -1,
      editedItem: {
        package_name: 'Frozen Yogurt',
        shipping_date: new Date().toISOString().substr(0, 10),
        arrival_date: new Date().toISOString().substr(0, 10),
        country_of_origin: 'Spain',
        destination_country: 'Uganda',
        status: 'PD',
      },
      defaultItem: {
        package_name: '',
        shipping_date: '',
        arrival_date: '',
        country_of_origin: '',
        destination_country: '',
        status: '',
      },
      status: ['PD', 'AD', 'OTW']
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    today() {
      return new Date().toISOString().substr(0, 10);
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    this.loading = true;
    try {
      const { data } = await this.axios.get('/api/v1/shipments/');
      this.shipments = data
    }
    catch (error) {
      this.shipments = []
      let message = Object.values(error.response.data).join(" ").toString()
      this.SET_SNACK_BAR({ message, showSnackbar: true, color: 'red' })
    }
    finally {
      this.loading = false;
    }

  },
  methods: {
    ...mapMutations({
      SET_SNACK_BAR: "auth/SET_SNACK_BAR "
    }),

    editItem(item) {
      this.editedIndex = this.shipments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.shipments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const item = this.shipments[this.editedIndex]
      this.modifyLoading = true;
      try {
        const { data } = await this.axios.delete(`/api/v1/shipments/${item.uuid}/`);
        console.log(data)
        this.shipments.splice(this.editedIndex, 1)
      }
      catch (error) {
        let message = Object.values(error.response.data).join(" ").toString()
        this.SET_SNACK_BAR({ message, showSnackbar: true, color: 'red' })
      }
      finally {
        this.modifyLoading = false;
      }
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save() {
      if (this.editedIndex > -1) {
        //edit shipment
        const payload = { ...this.editedItem }
        this.modifyLoading = true;
        try {
          const { data } = await this.axios.patch(`/api/v1/shipments/${payload.uuid}/`, payload);
          Object.assign(this.shipments[this.editedIndex], data)
        }
        catch (error) {
          let message = Object.values(error.response.data).join(" ").toString()
          this.SET_SNACK_BAR({ message, showSnackbar: true, color: 'red' })
        }
        finally {
          this.modifyLoading = false;
        }
      } else {
        //create
        const payload = { ...this.editedItem }
        this.modifyLoading = true;
        try {
          const { data } = await this.axios.post('/api/v1/shipments/', payload);
          this.shipments.push(data)
        }
        catch (error) {
          let message = Object.values(error.response.data).join(" ").toString()
          this.SET_SNACK_BAR({ message, showSnackbar: true, color: 'red' })
        }
        finally {
          this.modifyLoading = false;
        }
      }
      this.close()
    },
    getColor(status) {
      if (status == 'PD') return 'blue'
      else if (status == 'AD') return 'green'
      else if (status == 'OTW') return 'red'
      else return 'orange'
    },
  },
}
</script>
<style scoped>
  #chips{
    width: '1000px'
  }
</style>
