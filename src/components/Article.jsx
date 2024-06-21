import {fetchArticleById} from '../utils/api'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from './AddComment';
import ArticleVote from './ArticleVote';
import ErrorPage from './ErrorPage';
import CommentList from './CommentList';

const Article = () => {

    const {id} = useParams();
    const [article, setArticle] = useState({});
    const [errStatus, setErrStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setErrStatus(null);
        fetchArticleById(id)
            .then((articleData) => {
                setArticle(articleData);
            })
            .catch((err) => {
                setErrStatus(err.response.status);
            });
            setIsLoading(false);
    }, [id]);

    function getResult() {
        if(isLoading) {
            return (<h2>Loading article.....</h2>)
        }
        else if(errStatus) {
            return (<ErrorPage />) 
        }
        else {
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
                <AddComment id={article.article_id} />
                <br />
                <CommentList id={article.article_id} />
            </section>);
        }
    }

    return getResult();
};

export default Article;
