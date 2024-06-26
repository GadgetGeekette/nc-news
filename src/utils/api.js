import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-6bxb.onrender.com/api"
});

export const fetchArticles = ((params) => {
    return ncNewsApi.get('/articles', {params})
        .then(({data}) => {
            return data.articles;
        })
        .catch((err) => {
            console.log(err, '-- Error occurred whilst fetching articles --');
            throw(err);
        });
});

export const fetchArticleById = (id) => {
    return ncNewsApi.get(`/articles/${id}`)
        .then(({data}) => {
            return data.article;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst fetching article with ID: ${id} --`);
            throw(err);
        });
}

export const fetchComments = (articleId) => {
    return ncNewsApi.get(`/articles/${articleId}/comments`)
        .then(({data}) => {
            return data.comments;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst fetching comments for article with ID: ${articleId} --`);
            throw(err);
        });
}

export const fetchTopics = () => {
    return ncNewsApi.get(`/topics`)
        .then(({data}) => {
            return data.topics;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst fetching topics --`);
            throw(err);
        });
}

export const updateCommentVote = (id, incVotes) => {
    return ncNewsApi.patch(`/comments/${id}`, {inc_votes: incVotes})
        .then(({data}) => {
            return data.comment;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst updating comment vote with ID: ${id} --`);
            throw(err);
        });
}

export const updateArticleVote = (id, incVotes) => {
    return ncNewsApi.patch(`/articles/${id}`, {inc_votes: incVotes})
        .then(({data}) => {
            return data.article;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst updating article vote with ID: ${id} --`);
            throw(err);
        });
}

export const postComment = (id, comment) => {
    return ncNewsApi.post(`/articles/${id}/comments`, comment)
        .then(({data}) => {
            return data.comment;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst adding comment with article ID: ${id} --`);
            throw(err);
        });
}

export const deleteComment = (id) => {
    return ncNewsApi.delete(`/comments/${id}`)
        .then(({status}) => {
            return status;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst adding comment with article ID: ${id} --`);
            throw(err);
        });
}

