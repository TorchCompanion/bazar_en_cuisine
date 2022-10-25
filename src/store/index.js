import {createStore} from 'vuex';


let storedRecipesJson = localStorage.getItem('recipes') || '[]';
let storedRecipes = JSON.parse(storedRecipesJson);
console.log('storedRecipes', storedRecipes);


export default createStore({
    // store variables
    state: {
        user: undefined,
        recipes: storedRecipes,
        activeView: 0,
    },
    // get store variables values
    getters: {
        getUser: (state) => {
            return state.user
        },
        getProfilePicture: (state) => {
            if (state.user !== undefined && state.user.pp !== undefined) {
                return state.user.pp;
            }
            return "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
        },
        getRecipes: (state) => {
            return state.recipes;
        },
        getRecipesIds: (state) => {
            return state.recipes.map((recipe) => {
                if (recipe?.content?.details?.id !== undefined) {
                    return recipe.content.details.id;
                }
            });
        },
        getActiveView: (state) => {
            return state.activeView;
        },
        getAllIngredients: (state) => {
            console.log('getAllIngredients', state.recipes);
            // todo => do
        }
    },
    // change variables values
    mutations: {
        update_user(state, newUser) {
            state.user = newUser
        },
        add_recipe(state, newRecipe) {
            state.recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(state.recipes));
        },
        remove_recipe(state, recipeToDelete) {
            let i = -1;
            for (let j = 0; j < state.recipes.length; j++) {
                if (state.recipes[j].content.details.id === recipeToDelete.content.details.id) {
                    i = j;
                    state.recipes.splice(i, 1);
                    localStorage.setItem('recipes', JSON.stringify(state.recipes));
                    return;
                }
            }
        },
        change_active_view(state, newViewID) {
            state.activeView = newViewID;
        }
    },


    /*
    actions: {
    },
    modules: {
    }//*/
})
