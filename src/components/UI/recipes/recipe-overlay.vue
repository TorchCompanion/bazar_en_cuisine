<template>
    <div class="recipe-overlay">
        <div class="back-btn-container">
            <button class="btn"
                    @click.prevent="closeRecipe">🔙
            </button>
        </div>

        <div class="bookmark_container">
            <button v-if="!recipeIsSaved" class="btn"
                    @click.prevent="addRecipe">🔖
            </button>
            <button v-else class="btn"
                    @click.prevent="removeRecipe">❌
            </button>
        </div>

        <div class="w-100 position-relative">
            <div class="img_wrapper">
                <img :src="getCoverImage(recipe)"
                     alt="recipe illustration"
                     class="cover">
            </div>
        </div>

        <div class="w-100 recipe-content px-4 py-4">
            <div class="content__inner text-center">
                <h2 class="mb-0">{{ recipe.content.details.name }}</h2>
                <span class="subtitle text-muted">by {{ recipe.display.source.sourceDisplayName }}</span>
                <div class="rating mt-4 d-flex justify-content-center">
                    <div class="rating-inner">40 min.</div>
                    <div class="rating-inner">⭐ {{ avrgRating }}</div>
                </div>

                <div class="card mt-3 mb-3">
                    <div class="content-text_wrapper mt-2">
                        <div class="w-100"
                             v-html="toHTML(recipe.content.description.text)"></div>
                    </div>
                </div>


                <div class="tab-container">
                    <div class="tab__header d-flex justify-content-around">
                        <div :class="['tab__item', {'active__tab':tabIndex == 0}]"
                             @click.prevent="tabIndex = 0">
                            Ingredients
                        </div>
                        <div :class="['tab__item', {'active__tab':tabIndex == 1}]"
                             @click.prevent="tabIndex = 1">
                            Instructions
                        </div>
                        <div :class="['tab__item', {'active__tab' :tabIndex == 2}]"
                             @click.prevent="tabIndex = 2">
                            Reviews ({{ recipe.content.reviews.totalReviewCount }})
                        </div>
                    </div>

                    <div class="tab__content">
                        <div v-if="tabIndex == 0" class="tab__container tab0">
                            <ul v-if="recipe.content.ingredientLines !== undefined"
                                class="">
                                <li v-for="(ingredient, index) in recipe.content.ingredientLines"
                                    :key="index">
                                    <span v-if="ingredient.wholeLine !== ''" class="text">
                                        {{ ingredient.wholeLine }}
                                    </span>
                                    <span v-else class="text">
                                        {{ ingredient.ingredient }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div v-else-if="tabIndex == 1" class="tab__container tab1">
                            <ul v-if="recipe.content.preparationSteps !== undefined"
                                class="">
                                <li v-for="(instruction, index) in recipe.content.preparationSteps"
                                    :key="index">
                                    {{ instruction }}
                                </li>
                            </ul>
                        </div>
                        <div v-else-if="tabIndex == 2" class="tab__container tab2">
                            <ul v-if="recipe.content.reviews.reviews !== undefined"
                                class="">
                                <li v-for="(review, index) in recipe.content.reviews.reviews"
                                    :key="index">
                                    Reviews ({{ recipe.content.reviews.totalReviewCount }})
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {marked} from 'marked';

    export default {
        name: "recipe-overlay",
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                d: null,
                tabIndex: 0,
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
            },
            recipesIds() {
                return this.$store.getters.getRecipesIds;
            },
            recipeIsSaved() {
                if (this.recipe === null || this.recipe === undefined) {
                    return false;
                }
                let index = this.recipesIds.indexOf(this.recipe.content.details.id);
                console.log(index)
                return index !== -1;
            },
        },
        created() {

        },
        mounted() {

        },
        methods: {
            toHTML(mkdwn) {
                return marked.parse(mkdwn);
            },
            getCoverImage(recipe) {
                let img = recipe.content?.details?.images[0]?.resizableImageUrl;
                if (img === undefined || img === null) {
                    return 'https://via.placeholder.com/350x150';
                }
                return img;
            },
            closeRecipe() {
                this.$emit('close-recipe', {});
            },
            addRecipe() {
                // so we dont add empty recipe
                if (this.recipe === undefined || this.recipe === null) {
                    return;
                }
                this.$store.commit('add_recipe', this.recipe);
            },
            removeRecipe() {
                if (this.recipe === undefined || this.recipe === null) {
                    return;
                }
                this.$store.commit('remove_recipe', this.recipe);
            }
        },
        components: {},
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>