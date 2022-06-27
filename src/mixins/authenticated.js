import {mapGetters} from 'vuex';

export default {
    async beforeRouteEnter(to, from, next) {
        next(async (vm) => {
            if (!vm.$store.state?.auth?.isAuthenticated) {
                next({
                    name: 'login',
                    query: {
                        from: to.fullPath,
                    }
                })
            } else {
                next()
            }
        })

    },
    computed: {
        ...mapGetters({
            isAuthenticated: "auth/GET_IS_AUTHENTICATED",
        })
    },
    watch: {
        isAuthenticated(val) {
            if (!val) {
                this.$router.push({
                    path: '/login',
                    query: {
                        from: this.$router?.history?.current?.fullPath || '/',
                    }
                })
            }
        }
    }
}
