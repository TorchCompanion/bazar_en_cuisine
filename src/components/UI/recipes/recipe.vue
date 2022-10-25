<template>
    <div class="recipe">
        <div v-if="recipe !== undefined" class="w-100 position-relative">
            <div class="w-100 position-relative">
                <div class="img_wrapper">
                    <img :src="getCoverImage(recipe)"
                         alt="recipe illustration"
                         class="cover">
                </div>
            </div>
            <div class="row details d-flex align-content-center">
                <div class="col-6">
                    <h5>{{ recipe.content.details.name }}</h5>
                    <div class="review">
                        ⭐ {{ avrgRating }}&nbsp;
                        <span class="small text-muted">({{ recipe.content.reviews.totalReviewCount }})</span>
                    </div>
                </div>
                <div class="col-6">
                    <p class="text-muted">by {{ recipe.display.source.sourceDisplayName }}</p>
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
        computed: {
            avrgRating() {
                if (this.recipe.content.reviews.averageRating !== undefined
                    && this.recipe.content.reviews.averageRating !== null) {
                    return this.recipe.content.reviews.averageRating.toFixed(1);
                }
                return '-';
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            getCoverImage(recipe) {
                let img = recipe.content?.details?.images[0]?.resizableImageUrl;
                if (img === undefined || img === null) {
                    return 'https://via.placeholder.com/350x150';
                }
                return img;
            },
        },
        components: {},
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>