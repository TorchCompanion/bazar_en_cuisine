<template>
    <div class="container main-container position-relative">
        <!-- top menu -->
        <top-menu @startSearch="search"></top-menu>

        <a class="nav-item" href="">
            <span class="icon"></span>
            <span class="label"></span>
        </a>

        <!-- search module -->
        <div :class="['search-container',
        {'open': searchMode}]">
            <div class="container">
                <div class="search-top mt-4 d-flex justify-content-between">
                    <div class="left">
                        <button class="btn"
                                @click.prevent="toggleSearch">🔙
                        </button>
                    </div>
                    <div class="right">
                        <input v-model="searchQuery" placeholder="search..."
                               type="text"
                               @keydown.enter="setupSearch">
                    </div>
                </div>
                <div class="search-listing-container mt-4">
                    <search-listing :query="query"></search-listing>
                </div>
            </div>
        </div>

        <!-- display recipes -->
        <div :class="['recipe-overlay-container',
        {'open': recipeMode}]">
            <div v-if="recipeDetail !== undefined"
                 class="w-100">
                <recipe-overlay :recipe="recipeDetail"
                                @close-recipe="closeRecipe"></recipe-overlay>
            </div>
        </div>


        <!-- near future ==> routerView -->
        <div class="container-fluid">
            <h1>Recipes 🍪</h1>
            <!-- listing de recipes -->
            <recipes-listing @recipe-click="showRecipe"></recipes-listing>
            <!-- / listing de recipes -->
        </div>

        <!-- / routerView -->
        <!-- app-bar -->
        <!-- TODO CREATE BOTTOM BAR
        TODO : @see ./src/components/UI/bottom-bar.vue -->
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import RecipesListing from "@/components/UI/recipes/recipes-listing";
    import TopMenu from "@/components/UI/top-menu";
    import SearchListing from "@/components/UI/recipes/search-listing";
    import BottomBar from "@/components/UI/bottom-bar";
    import RecipeOverlay from "@/components/UI/recipes/recipe-overlay";


    const user_ = {
        name: 'John',
        age: 30,
        address: {
            street: 'Main Street',
            number: 123
        }
    };

    export default {
        name: 'App',
        components: {
            RecipeOverlay,
            SearchListing,
            TopMenu,
            RecipesListing,
            BottomBar,
        },
        data() {
            return {
                d: null,
                userData: undefined,
                // state recipe
                recipeMode: false,
                recipeDetail: undefined,
                // state search
                searchMode: false,
                searchQuery: '',
                query: '',
                searchLoading: false,
                body_: undefined,
            }
        },
        watch: {
            hasModal: function (newVal) {
                if (newVal) {
                    // si on est en searchMode == true
                    this.body_.classList.add('no-scroll');
                } else {
                    this.body_.classList.remove('no-scroll');
                }
            }
        },
        computed: {
            hasModal() {
                return this.recipeMode || this.searchMode;
            },
        },
        mounted() {
            this.body_ = document.querySelector('body');
            setTimeout(() => {
                this.userData = user_;
            }, 2000);
        },
        methods: {
            closeRecipe() {
                this.recipeMode = false;
                setTimeout(() => {
                    this.recipeDetail = undefined;
                }, 230);
            },
            showRecipe(recipe) {
                if (recipe !== undefined) {
                    this.recipeDetail = recipe;
                    this.recipeMode = true;
                } else {
                    this.recipeDetail = undefined;
                    this.recipeMode = false;
                }
            },
            search(e) {
                console.log('search', e);
                this.toggleSearch();
            },
            toggleSearch() {
                this.searchMode = !this.searchMode;
                if (!this.searchMode) {
                    // reset searchState
                    this.searchQuery = '';
                    this.query = '';
                    this.searchLoading = false;
                }
            },
            setupSearch(e) {
                // si on a deja une recherche en cours
                if (this.searchLoading) {
                    return;
                }
                //this.searchLoading = true;
                this.query = this.searchQuery;
                console.log('setupSearch', e);
            }
        }
    }
</script>

<style>

</style>
