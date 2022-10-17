import axios from 'axios';

const apiKey = '58222561d8msh75b8a9bee7db0f1p1c62d5jsn1d21abda72c0';
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
    //*
    searchRecipes: (
        searchTerm,
        tag = undefined,
        page = 0,
        limit = 10
    ) => {
        let start = page * limit;
        return http.get(`feeds/search`, {
            params: {
                q: searchTerm,
                maxResult: limit,
                start: start,
                allowedAttribute: tag,
                maxTotalTimeInSeconds: '5000',
            }
        });
    }//*/

    // TODO create a clean method to get categories
}