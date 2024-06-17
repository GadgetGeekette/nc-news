import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-6bxb.onrender.com/api"
})

export const fetchArticles = ((sorting) => {
    console.log(sorting, '--api sorting params')
    return ncNewsApi.get('/articles', {params: sorting})
        .then(({data}) => {
            console.log(data.articles, '--api data')
            return data.articles;
        })
        .catch((err) => {
            console.log(err, '-- Error whilst fetching categories --')
        })
})
