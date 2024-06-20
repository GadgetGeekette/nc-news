import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-6bxb.onrender.com/api"
});

// TODO: Due to the BE kata (https://l2c.northcoders.com/courses/be/nc-news#sectionId=Task_11,step=intro) for filtering articles by topic having the title: 'CORE: GET /api/articles (topic query)' I mistakenly added the topic param to the JSON body instead of the URL because I would have expected the title to be: 'CORE: GET /api/articles/?topic' as the others had titles along the lines of: 'CORE: GET /api/articles/:topic'. As axios GET cannot pass data in the body, only in the params, I will need to alter the BE to handle this. However I can see from inspecting the Network dev tools that the param is passing from the FE as expected so should work when the BE is updated.
export const fetchArticles = ((sorting, params) => {
    return ncNewsApi.get('/articles', {params})
        .then(({data}) => {
            return data.articles;
        })
        .catch((err) => {
            console.log(err, '-- Error occurred whilst fetching articles --')
        });
});

export const fetchArticleById = (id) => {
    return ncNewsApi.get(`/articles/${id}`)
        .then(({data}) => {
            return data.article;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst fetching article with ID: ${id} --`)
        });
}

export const fetchComments = (articleId) => {
    return ncNewsApi.get(`/articles/${articleId}/comments`)
        .then(({data}) => {
            return data.comments;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst fetching comments for article with ID: ${articleId} --`)
        });
}

export const fetchTopics = () => {
    return ncNewsApi.get(`/topics`)
        .then(({data}) => {
            return data.topics;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst fetching topics --`)
        });
}

export const updateCommentVote = (id, incVotes) => {
    return ncNewsApi.patch(`/comments/${id}`, {inc_votes: incVotes})
        .then(({data}) => {
            return data.comment;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst updating comment vote with ID: ${id} --`)
        });
}

export const updateArticleVote = (id, incVotes) => {
    return ncNewsApi.patch(`/articles/${id}`, {inc_votes: incVotes})
        .then(({data}) => {
            return data.article;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst updating article vote with ID: ${id} --`)
        });
}

export const postComment = (id, comment) => {
    return ncNewsApi.post(`/articles/${id}/comments`, comment)
        .then(({data}) => {
            return data.comment;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst adding comment with article ID: ${id} --`)
        });
}

export const deleteComment = (id) => {
    return ncNewsApi.delete(`/comments/${id}`)
        .then(({status}) => {
            return status;
        })
        .catch((err) => {
            console.log(err, `-- Error occurred whilst adding comment with article ID: ${id} --`)
        });
}

