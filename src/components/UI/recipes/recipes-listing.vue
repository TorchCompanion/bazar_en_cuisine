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
            <div v-if="loading" class="w-100 mt-4">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        🍔
                    </div>
                    <span class="d-block mt-2 sr-only">Chargement en cours...</span>
                </div>
            </div>

            <div v-if="!loading"
                 class="w-100 d-flex justify-content-center mt-4 mb-4">
                <!-- create a button "load more" -->
                <button :disabled="loading"
                        class="btn btn-primary"
                        @click="loadMoreRecipes">
                    Charger plus de recettes 🍔
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    import Recipe from './recipe.vue';
    import YumliService from "@/services/YumliService";

    export default {
        name: "recipes-listing",
        props: {},
        data() {
            return {
                d: null,
                recipesList: undefined,
                loading: false,
                yumliService: YumliService,
                page: 0,
                limit: 10,
            }
        },
        watch: {},
        computed: {},
        created() {
            this.loadRecipes();
        },
        mounted() {

        },
        methods: {
            goToRecipe(recipe) {
                console.log('goToRecipe', recipe);
                this.$emit('recipe-click', recipe);
            },
            loadMoreRecipes() {
                this.page += 1;
                this.loadRecipes();
            },
            loadRecipes() {
                this.loading = true;
                this.yumliService.getRecipesList(
                    'list.recipe.popular',
                    this.page,
                    this.limit
                )
                    .then(response => {
                        if (response.data.feed === undefined
                            || response.data.feed === null) {
                            throw new Error("Aucune recette trouvée");
                        }

                        if (this.recipesList === undefined) {
                            this.recipesList = response.data.feed;
                        } else {
                            // [ATTENTION] => do not check for duplicate
                            // why use "..." syntax
                            // [1,2,3,4].push([0,5,6]) => [1,2,3,4,[0,5,6]]
                            // [1,2,3,4].push(...[0,5,6]) => [1,2,3,4,0,5,6]
                            this.recipesList.push(
                                ...response.data.feed
                            );
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        if (this.page >= 1) {
                            this.page -= 1;
                        }
                        this.loading = false;
                    })
                ;
            }
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