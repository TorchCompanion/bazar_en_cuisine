<template>
    <div class="search-listing px-2">
        <span v-if="query.length > 3"
              class="small text-muted">Resultats pour : {{ query }}</span>
        <div v-if="recipes !== undefined && recipes.length > 0"
             class="w-100 listing-recipes d-flex flex-column
        justify-content-center align-items-center">
            <recipe v-for="recipe in recipes"
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
        <div v-if="!loading && query !== ''"
             class="w-100 d-flex justify-content-center mt-4 mb-4">
            <button :disabled="loading"
                    class="btn btn-primary"
                    @click="loadMoreRecipes">
                Charger plus de resultats
            </button>
        </div>
    </div>
</template>

<script>
    import YumliService from "@/services/YumliService";
    import Recipe from "./recipe.vue";

    export default {
        name: "search-listing",
        props: {
            query: {
                type: String,
                required: true,
                default: '',
            }
        },
        data() {
            return {
                d: null,
                recipes: [],
                loading: false,
                page: 0,
                limit: 10,
                yumli: YumliService,
            }
        },
        watch: {
            query: function (newVal, oldVal) {
                console.log('query changed', newVal, oldVal);
                this.recipes = [];
                this.getData();
            }
        },
        computed: {},
        created() {

        },
        mounted() {

        },
        methods: {
            goToRecipe(recipe) {
                console.log('goToRecipe', recipe);
            },
            loadMoreRecipes() {
                this.page += 1;
                this.getData();
            },

            getData() {
                if (this.query === '' || this.query.length < 3) {
                    return;
                }

                this.loading = true;
                this.yumli.searchRecipes(
                    this.query,
                    undefined,
                    this.page,
                    this.limit,
                )
                    .then((res) => {
                        if (res.data.feed === undefined
                            || res.data.feed === null) {
                            throw new Error("Aucune recette trouvée");
                        }

                        if (this.recipes === undefined) {
                            this.recipes = res.data.feed;
                        } else {
                            // [ATTENTION] => do not check for duplicate
                            this.recipes.push(
                                ...res.data.feed
                            );
                        }
                        console.log('search res', res.data);
                        this.loading = false;
                    })
                    .catch((err) => {
                        console.log('search err', err);
                        if (this.page >= 1) {
                            this.page -= 1;
                        }
                        this.loading = false;
                    })
                ;

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