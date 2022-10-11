<template>
    <div class="container main-container">
        <!-- top menu -->
        <top-menu></top-menu>
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


    const user_ = {
        name: 'John',
        age: 30,
        address: {
            street: 'Main Street',
            number: 123
        }
    };

    const recipesList_ = [
        {
            id: 3,
            title: 'BigMac',
            review: 3,
            creator: 'Ronald McDonald',
        },
        {
            id: 1,
            title: 'Pumpkin Soup',
            review: 4.7,
            creator: 'Harry Potter',
        },
        {
            id: 2,
            title: 'Fried Chicken',
            review: 4.7,
            creator: 'Colonel Sanders',
        },
        {
            id: 4,
            title: 'Double SteakHouse',
            review: 5,
            creator: 'BK',
        }
    ];

    export default {
        name: 'App',
        components: {
            TopMenu,
            RecipesListing,
        },
        data() {
            return {
                d: null,
                query: 'default :D',
                userData: undefined,
                recipesList: recipesList_,
            }
        },
        mounted() {
            setTimeout(() => {
                this.userData = user_;
            }, 2000);
        }
    }
</script>

<style>

</style>
