import axios from 'axios';

const apiKey = 'YOUR_API_KEY';
const apiHost = 'YOUR_API_HOST';

const http = axios.create({
    baseURL: 'https://yummly2.p.rapidapi.com/',
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

    searchRecipes: (searchTerm) => {
        return http.get(`?q=${searchTerm}`);
    }
}