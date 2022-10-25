<template>
    <div class="listing__container">
        <div class="listing-wrapper">
            <div v-if="recipesList !== undefined"
                 class="w-100 listing-recipes d-flex flex-column
        justify-content-center align-items-center">
                <recipe v-for="recipe in recipesList"
                        :key="recipe.id"
                        :recipe="recipe"
                        @click="goToRecipe(recipe)"></recipe>
            </div>

        </div>
    </div>
</template>

<script>
    import Recipe from './recipe.vue';

    export default {
        name: "recipes-saved-listing",
        props: {},
        data() {
            return {
                d: null,
            }
        },
        watch: {},
        computed: {
            savedRecipes() {
                return this.$store.getters.getRecipes;
            },
            recipesList() {
                if (this.savedRecipes !== undefined && this.savedRecipes !== null) {
                    // eslint-disable-next-line
                    return this.savedRecipes.reverse();
                }
                return [];
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            goToRecipe(recipe) {
                this.$emit('recipe-click', recipe);
            },
        },
        components: {
            Recipe,
        },
        beforeUnmount() {
        }
    }
</script>

<style scoped>

</style>