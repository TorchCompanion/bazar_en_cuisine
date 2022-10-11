<template>
    <div class="listing__container">
        <div class="listing-wrapper">
            <div v-if="recipesList !== undefined && loading === false"
                 class="w-100 listing-recipes d-flex flex-column
        justify-content-center align-items-center">
                <recipe v-for="recipe in recipesList"
                        :key="recipe.id"
                        :recipe="recipe"
                        @click="goToRecipe(recipe)"></recipe>
            </div>
            <div v-else class="w-100">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        🍔
                    </div>
                    <span class="d-block mt-2 sr-only">Chargement en cours...</span>
                </div>
            </div>
            <!-- TODO create a button "load more" -->
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

                    this.recipesList = response.data.feed;
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                })
            ;
        },
        mounted() {

        },
        methods: {
            goToRecipe(recipe) {
                console.log('goToRecipe', recipe);
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