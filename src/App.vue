<template>
    <img alt="Vue logo" src="./assets/logo.png">

    <div v-if="userData !== undefined" class="w-100">
        <h3>Formulaire contact</h3>
        <form action="">
            <input v-model="userData.name" type="text">
        </form>
    </div>

    <div class="sepatron x"></div>

    <div class="w-100 listing-recipes">
        <recipe v-for="recipe in recipesList"
                :key="recipe.id"
                :recipe="recipe"></recipe>
    </div>

    <HelloWorld :user="userData"
                msg="Macaque 1"/>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue';
    import Recipe from './components/UI/recipes/recipe.vue';

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
            HelloWorld,
            Recipe,
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
    div.sepatron {
        margin: 20px 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
