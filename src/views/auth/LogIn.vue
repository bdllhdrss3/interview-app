<template>
    <div class="d-flex align-center" style="backgroundColor: #848884; width:100%; height: 100%">
        <v-card class="mx-auto mt-5 align-self-center" width="500" height="350">
            <v-card-title class="justify-center">Log In</v-card-title>
            <v-card-text class="mx-1ssssssssss">
                <v-text-field v-model="email" label="Email" type="email" filled densed rounded
                    :rules="[rules.req,rules.email]"></v-text-field>
                <v-text-field v-model="password" label="Password" filled densed rounded
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required,rules.min]"
                    @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'">
                </v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="primary" @click="login()">Log in</v-btn>
            </v-card-actions>
            <v-card-actions class="justify-center">
                <router-link to="/signup">Create Account Instead</router-link>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
            show: false,
            show1: false,
            snackbar: false,
            message: '',
            color: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                email(email) {
                    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
                    return Boolean(email.match(regexEmail)) || 'Invalid email'
                }
            },
        }
    },
    computed: {
        validated() {
            let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (this.password.length < 1) return true
            if (this.confirmPassword.length < 1) return true
            if (this.email.length < 1) return true
            if (!this.email.match(regexEmail)) return true
            return false
        }
    },
    methods: {
        ...mapMutations({
            SET_AUTH_SUCCESS: "auth/SET_AUTH_SUCCESS",
            SET_LOADING: "auth/SET_AUTH_LOADING",
            SET_SNACK_BAR: "auth/SET_SNACK_BAR "
        }),

        async login() {
            let payload = { email: this.email, password: this.password }
            this.SET_LOADING(true)
            try {
                let { data } = await this.axios.post('/api/v1/users/login/', payload);
                data = data.data;
                this.SET_AUTH_SUCCESS({ email: data.email, username: data.username, uuid: data.uuid, token: data.tokens.access, refresh: data.tokens.refresh });
                localStorage.setItem("access_token", data.tokens.access);
                localStorage.setItem("refresh_token", data.tokens.refresh);
                this.$router.push("/home");
            }
            catch (error) {
                this.message = Object.values(error.response.data).join(" ").toString()
                this.snackbar = true
                this.color = 'red'
                this.SET_SNACK_BAR({ message: this.message, showSnackbar: true, color: this.color })
            } finally {
                this.SET_LOADING(false)
            }
        }
    }
}
</script>