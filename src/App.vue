<template>
    <div class="container main-container position-relative">
        <!-- top menu -->
        <top-menu @startSearch="search"></top-menu>

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

        <!-- near future ==> routerView -->
        <div class="container-fluid">
            <h1>Recipes 🍪</h1>
            <!-- listing de recipes -->
            <recipes-listing></recipes-listing>
            <!-- / listing de recipes -->
        </div>

        <!-- / routerView -->
        <!-- app-bar -->
        <!-- TODO CREATE BOTTOM BAR
        TODO : @see ./src/components/UI/bottom-bar.vue -->
    </div>
</template>

<script>
    import RecipesListing from "@/components/UI/recipes/recipes-listing";
    import TopMenu from "@/components/UI/top-menu";
    import SearchListing from "@/components/UI/recipes/search-listing";


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
            SearchListing,
            TopMenu,
            RecipesListing,
        },
        data() {
            return {
                d: null,
                userData: undefined,
                searchMode: false,
                searchQuery: '',
                query: '',
                searchLoading: false,
                body_: undefined,
            }
        },
        watch: {
            searchMode: function (newVal) {
                if (newVal) {
                    // si on est en searchMode == true
                    this.body_.classList.add('no-scroll');
                } else {
                    this.body_.classList.remove('no-scroll');
                }
            }
        },
        mounted() {
            this.body_ = document.querySelector('body');
            setTimeout(() => {
                this.userData = user_;
            }, 2000);
        },
        methods: {
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
