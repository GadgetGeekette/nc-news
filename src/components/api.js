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
    return ncNewsApi.get(`/articles/${articleId}/comments`)
        .then(({data}) => {
            return data.comments;
        })
        .catch((err) => {
            console.log(err, `-- Error whilst fetching comments for article with ID: ${articleId} --`)
        });
}

export const updateCommentVote = (id, incVotes) => {
    return ncNewsApi.patch(`/comments/${id}`, {inc_votes: incVotes})
        .then(({data}) => {
            return data.comment;
        })
        .catch((err) => {
            console.log(err, `-- Error whilst updating comment vote with ID: ${id} --`)
        });
}

export const updateArticleVote = (id, incVotes) => {
    return ncNewsApi.patch(`/articles/${id}`, {inc_votes: incVotes})
        .then(({data}) => {
            return data.article;
        })
        .catch((err) => {
            console.log(err, `-- Error whilst updating article vote with ID: ${id} --`)
        });
}