import {fetchArticleById} from './api'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import AddComment from './AddComment';
import ArticleVote from './ArticleVote';

const Article = () => {

    const {id} = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        fetchArticleById(id)
            .then((articleData) => {
                setArticle(articleData)
            })
            .catch((err) => {
                console.log(err, '<--Fetch article error')
            });
    }, [id]);

    return (<section className='pad-full'>
        <p className='bold'>{article.title}</p>
        <img src={article.article_img_url} className="image-medium" alt={`Image of ${article.title}`} />
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author} </p>
        <p>Created On: {article.created_at} </p>
        <ArticleVote article={{id:article.article_id,voteCount:article.votes}} />
        <p>Comments: {article.comment_count} </p>
        <p>{article.body}</p>
        <br />
        {AddComment(article.article_id)}
        <br />
        {CommentList(article.article_id)}
    </section>);
};

export default Article
