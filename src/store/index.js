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
            let elementId = {}; // <= list
            state.recipes.forEach((recipe) => {
                if (recipe?.content?.ingredientLines !== undefined) {
                    recipe.content.ingredientLines.forEach((ingLine) => {
                        if (elementId[ingLine.ingredientId] === undefined) {
                            elementId[ingLine.ingredientId] = [];
                            elementId[ingLine.ingredientId].push(ingLine);
                        } else {
                            elementId[ingLine.ingredientId].push(ingLine);
                        }
                    });
                }
            });
            let listRow = {};
            for (const i_ in elementId) {
                let ingredientRow = elementId[i_];
                listRow[i_] = {
                    units: {},
                    display: [],
                    name: ingredientRow[0].ingredient || 'undefined',
                    src: ingredientRow,
                };
                ingredientRow.forEach((ing_) => {
                    let unit = '';
                    if (ing_.unit !== undefined && ing_.unit !== '') {
                        unit = ing_.unit;
                    }
                    if (listRow[i_].units[unit] === undefined) {
                        listRow[i_].units[unit] = ing_.quantity || 1;
                    } else {
                        listRow[i_].units[unit] += ing_.quantity || 1;
                    }
                });
                for (const unit_ in listRow[i_].units) {
                    listRow[i_].display.push({
                        quantity: listRow[i_].units[unit_],
                        label: unit_,
                    });
                }
            }
            let output = [];
            for (const id_ in listRow) {
                output.push(listRow[id_]);
            }
            return output;
        },
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
