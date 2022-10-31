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
        <div v-show="activeView === 0" class="container-fluid">
            <h1>Saved recipes 🔖</h1>
            <!-- listing de recipes -->
            <recipes-saved-listing @recipe-click="showRecipe"></recipes-saved-listing>
            <!-- / listing de recipes -->
        </div>
        <div v-show="activeView === 1" class="container-fluid">
            <h1>Recipes 🍪</h1>
            <!-- listing de recipes -->
            <recipes-listing @recipe-click="showRecipe"></recipes-listing>
            <!-- / listing de recipes -->
        </div>
        <div v-show="activeView === 2" class="container-fluid">
            <h1>Grocery 🍎</h1>
            <!-- listing d'ingredients -->
            <groceries></groceries>
            <!-- / listing d'ingredients -->
        </div>

        <!-- / routerView -->
        <!-- app-bar -->
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import RecipesListing from "@/components/UI/recipes/recipes-listing";
    import TopMenu from "@/components/UI/top-menu";
    import SearchListing from "@/components/UI/recipes/search-listing";
    import BottomBar from "@/components/UI/bottom-bar";
    import RecipeOverlay from "@/components/UI/recipes/recipe-overlay";
    import RecipesSavedListing from "@/components/UI/recipes/recipes-saved-listing";
    import Groceries from "@/components/UI/recipes/groceries";


    const user_ = {
        name: 'John',
        email: 'j.doe@gmail.com',
        pp: 'data:image/jpeg;base64,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',
        age: 30,
        address: {
            street: 'Main Street',
            number: 123
        }
    };

    export default {
        name: 'App',
        components: {
            Groceries,
            RecipesSavedListing,
            RecipeOverlay,
            SearchListing,
            TopMenu,
            RecipesListing,
            BottomBar,
        },
        data() {
            return {
                d: null,
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
            userData() {
                return this.$store.getters.getUser;
            },
            activeView() {
                return this.$store.getters.getActiveView;
            },
        },
        created() {
            setTimeout(() => {
                this.$store.commit('update_user', user_);
            }, 5000);
        },
        mounted() {
            this.body_ = document.querySelector('body');
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
