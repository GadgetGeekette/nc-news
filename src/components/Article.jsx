import { useParams } from 'react-router-dom'
import {fetchArticleById} from './api'
import { useState, useEffect } from 'react';

const Article = () => {

    const { id } = useParams();
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
        <p>Votes: {article.votes} </p>
        <p>Comments: {article.comment_count} </p>
        <p>{article.body}</p>
    </section>);
};

export default Article
