<template>
    <nav class="bottom-bar w-100 d-flex align-items-center">
        <div class="container-fluid d-flex align-items-center justify-content-around">
            <a :class="['btn d-flex flex-column', {'active-bar': widget === 0}]" href="#"
               @click.prevent="widget = 0">
                <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/bookmark-white.svg">
                <span class="label-bottom-bar">Saved</span>
            </a>
            <a :class="['btn d-flex flex-column', {'active-bar': widget === 1}]" href="#"
               @click.prevent="widget = 1">
                <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/toque.svg">
                <span class="label-bottom-bar">Recipe</span>
            </a>
            <a :class="['btn d-flex flex-column', {'active-bar': widget === 2}]" href="#"
               @click.prevent="widget = 2">
                <span class="icon">
                    <img alt="" class="img-bottom-bar" src="../../assets/bottom-bar/apple.svg">
                </span>
                <span class="label-bottom-bar">Grocery</span>
            </a>
            <a :class="['btn d-flex flex-column', {'active-bar': widget === 3}]" href="#"
               @click.prevent="widget = 3">
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
                widget: 0,
            }
        },
        watch: {},
        computed: {},
        created() {

        },
        mounted() {

        },
        methods: {},
        components: {},
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>