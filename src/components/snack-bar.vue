<template>
    <v-snackbar v-model="showSnackbar" :timeout="timeout" :color="color">
        {{ message }}

        <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="close()">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: {
        show: Boolean,
        message: String,
        color: String,
    },
    data() {
        return {
            snackbar: false,
            text: 'My timeout is set to 2000.',
            timeout: -1,
        }
    },
    computed: {
        showSnackbar() {
            return this.show
        }
    },
    methods: {
        ...mapMutations({
            SET_SNACK_BAR: "auth/SET_SNACK_BAR "
        }),
        close() {
            this.SET_SNACK_BAR({ message: '', showSnackbar: false, color: '' })
        }
    }
}
</script>
