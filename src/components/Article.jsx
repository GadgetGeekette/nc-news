import {fetchArticleById} from './api'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useParams, Link } from 'react-router-dom';
import CommentList from './CommentList';
import ArticleVote from './ArticleVote';

const Article = () => {

    const {id} = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        fetchArticleById(id)
            .then((articleData) => {
                setArticle(articleData)
            });
    }, [id]);

    return (<section className='card'>
        <p className='bold'>{article.title}</p>
        <img src={article.article_img_url} className="image" alt={`Image of ${article.title}`} />
        <p>Topic: {article.topic}</p>
        <p>Author: {article.author} </p>
        <p>Created On: {article.created_at} </p>
        <ArticleVote article={{id:article.article_id,voteCount:article.votes}} />
        <p>Comments: {article.comment_count} </p>
        <p>{article.body}</p>
        <br />
        {CommentList(article.article_id)}
        {/* <Link to={`/articles/${article.article_id}/comments`} key={article.article_id}>View Comments</Link> */}
    </section>);
};

export default Article
