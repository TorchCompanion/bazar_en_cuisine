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