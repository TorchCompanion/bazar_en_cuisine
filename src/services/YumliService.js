import axios from 'axios';

const apiKey = 'YOUR_API_KEY';
const apiHost = 'yummly2.p.rapidapi.com';

const http = axios.create({
    baseURL: 'https://' + apiHost + '/',
    headers: {
        "Content-type": "application/json",
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
    }
});


export default {
    getRecipesList: (tag = '', page = 0, limit = 10) => {
        let start = page * limit;
        return http.get(`feeds/list`, {
            params: {
                limit: limit,
                start: start,
                tag: tag
            }
        });
    },

    // TODO create a clean search method
    // @see https://rapidapi.com/apidojo/api/yummly2/
    /*
    searchRecipes: (searchTerm,  page = 0, limit = 10) => {
        return http.get(`?q=${searchTerm}`);
    }//*/

    // TODO create a clean method to get categories
}