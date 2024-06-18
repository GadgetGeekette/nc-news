import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-6bxb.onrender.com/api"
});

export const fetchArticles = ((sorting) => {
    return ncNewsApi.get('/articles', {params: sorting})
        .then(({data}) => {
            return data.articles;
        })
        .catch((err) => {
            console.log(err, '-- Error whilst fetching articles --')
        });
});

export const fetchArticleById = (id) => {
    return ncNewsApi.get(`/articles/${id}`)
        .then(({data}) => {
            return data.article;
        })
        .catch((err) => {
            console.log(err, `-- Error whilst fetching article with ID: ${id} --`)
        });
}

export const fetchComments = (articleId) => {
    console.log(articleId, '-- api article id')
    return ncNewsApi.get(`/articles/${articleId}/comments`)
        .then(({data}) => {
            console.log(data, '--api data')
            return data.comments;
        })
        .catch((err) => {
            console.log(err, `-- Error whilst fetching comments for article with ID: ${articleId} --`)
        });
}
