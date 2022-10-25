<template>
    <nav class="nav navbar fixed-top top-bar">
        <div class="container-fluid d-flex justify-content-end align-content-end">
            <a class="nav-link" href="#" @click.prevent="startSearch">🔎</a>
            <a class="nav-link disabled">➕</a>
            <div>
                <div class="x ">
                    <img :src="profilPic" alt=""
                         class="img-fluid rounded-circle"
                         style="width: 32px">
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "top-menu",
        props: {},
        data() {
            return {
                d: null,
            }
        },
        watch: {},
        computed: {
            userData() {
                return this.$store.getters.getUser;
            },
            profilPic() {
                return this.$store.getters.getProfilePicture;
            },
        },
        created() {

        },
        mounted() {

        },
        methods: {
            startSearch() {
                this.$emit('start-search', {
                    event: 'start-search',
                    search: true,
                });
            }
        },
        components: {},
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>