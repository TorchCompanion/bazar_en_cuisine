<template>
    <nav class="bottom-bar w-100 d-flex align-items-center">
        <div class="container-fluid d-flex align-items-center justify-content-around">
            <a :class="['btn d-flex flex-column position-relative',
             {'active-bar': widget === 0}]" href="#"
               @click.prevent="changeActiveView(0)">
                <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/bookmark-white.svg">
                <span class="label-bottom-bar">Saved</span>
                <div class="bottom-bar-pill">{{ countSavedRecipes }}</div>
            </a>
            <a :class="['btn d-flex flex-column', {'active-bar': widget === 1}]" href="#"
               @click.prevent="changeActiveView(1)">
                <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/toque.svg">
                <span class="label-bottom-bar">
                    Recipe
                </span>
            </a>
            <a :class="['btn d-flex flex-column position-relative', {'active-bar': widget === 2}]" href="#"
               @click.prevent="changeActiveView(2)">
                <span class="icon">
                    <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/apple.svg">
                </span>
                <span class="label-bottom-bar">Grocery</span>
                <div class="bottom-bar-pill">{{ countIngredients }}</div>
            </a>
            <a :class="['btn d-flex flex-column', {'active-bar': widget === 3}]" href="#"
               @click.prevent="changeActiveView(3)">
                <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/lines.svg">
                <span class="label-bottom-bar">More</span>
            </a>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "bottom-bar",
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
            countSavedRecipes() {
                return this.$store.getters.getRecipes.length;
            },
            widget() {
                return this.$store.getters.getActiveView;
            },
            allIngredients() {
                return this.$store.getters.getAllIngredients;
            },
            countIngredients() {
                return Object.keys(this.$store.getters.getAllIngredients).length;
            },
        },
        created() {

        },
        mounted() {

        },
        methods: {
            changeActiveView(viewID) {
                this.$store.commit('change_active_view', viewID);
            }
        },
        components: {},
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>