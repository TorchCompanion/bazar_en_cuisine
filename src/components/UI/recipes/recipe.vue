<template>
    <div class="recipe">
        <div v-if="recipe !== undefined" class="w-100">
            <div class="w-100">
                <img alt="recipe illustration"
                     src="https://via.placeholder.com/350x150">
            </div>
            <div class="row">
                <div class="col-6">
                    <h3>{{ recipe.title }}</h3>
                    <div class="review">⭐ {{ recipe.review }}</div>
                </div>
                <div class="col-6">
                    <p class="text-muted">by {{ recipe.creator }}</p>
                </div>
            </div>
        </div>
        <div v-else class="w-100">
            <p>chargement ...</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recipe",
        props: {
            recipe: Object,
        },
        data() {
            return {
                d: null,
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