<template>
  <v-container>
    <v-card class="mt-10">
      <v-card-title>
        Shipments
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
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
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.name" label="Package Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.date" type="date" label="Shipping date"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.arrival" type="date" label="Estimated shipping date">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.to" label="Country of origin"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="editedItem.from" label="Destination country"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select :items="status" v-model="editedItem.status" label="Stasus"></v-select>
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
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
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
  export default {
  data() {
    return {
      loading: false,
      search: '',
      dialog: false,
      dialogDelete: false,
      
      headers: [
        {
          text: 'Package name',
          align: 'start',
          value: 'name',
        },
        { text: 'Shipping Date', value: 'date' },
        { text: 'Estimated arrival date', value: 'arrival' },
        { text: 'Country of origin', value: 'from' },
        { text: 'Destination country', value: 'to' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      shipments: [],
      editedIndex: -1,
      editedItem: {
        name: 'Frozen Yogurt',
        date: '01/01/2021',
        arrival: '02/05/2022',
        from: 'Spain',
        to: 'Uganda',
        status: 'pending',
      },
      defaultItem: {
        name: '',
        date: '',
        arrival: '',
        from: '',
        to: '',
        status: 'pending',
      },
      status: ['pending', 'arrived', 'on road']
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.loading = true;
    setInterval(() => this.initialize(), 1200)
  },
  methods: {
    initialize() {
      this.shipments = [
        {
          name: 'Yogurt',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'Moroco',
          to: 'Kenya',
          status: 'pending',
        },
        {
          name: 'Samsungs',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'Spain',
          to: 'Turkey',
          status: 'failed',
        },
        {
          name: 'Frozen Yogurt',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'Spain',
          to: 'Uganda',
          status: 'arrived',
        },
        {
          name: 'Tesla',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'China',
          to: 'USA',
          status: 'arrived',
        },
        {
          name: 'Mazda',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'Spain',
          to: 'Uganda',
          status: 'pending',
        },
        {
          name: 'Milk',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'UK',
          to: 'Uganda',
          status: 'on way',
        },
        {
          name: 'Frozen Yogurt',
          date: '01/01/2021',
          arrival: '02/05/2022',
          from: 'South Africa',
          to: 'Uganda',
          status: 'pending'
        }
      ]
      this.loading = false;
    },

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

    deleteItemConfirm() {
      this.shipments.splice(this.editedIndex, 1)
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.shipments[this.editedIndex], this.editedItem)
      } else {
        this.shipments.push(this.editedItem)
      }
      this.close()
    },
    getColor(status) {
      if (status == 'prending') return 'blue'
      else if (status == 'arrived') return 'green'
      else if (status == 'failed') return 'red'
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
