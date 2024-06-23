import { useState, useEffect } from 'react';
import { fetchArticles } from "../utils/api";
import { Link, useSearchParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const ArticleList = ({sort}) => {

    // TODO: add pagination

    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [errStatus, setErrStatus] = useState(null);
    const [searchParams] = useSearchParams();
    const topic = searchParams.get("topic");

    useEffect(() => {
        setIsLoading(true);
        setErrStatus(null);
        const params = {};
        params.topic = topic
            ? topic
            : null;
        if (sort) {
            const {sort: {sortBy}} = sort;
            const {sort: {orderBy}} = sort;
            params.sort_by = sortBy;
            params.order = orderBy;
        }
        fetchArticles(sort, params)
            .then((articleData) => {
                setArticles(articleData);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrStatus(err.response.status);
            });
    }, [topic, sort]);

    function getArticles(articleList){
        if (articleList) {
            return (
                <div className='cards'>
                    {articleList.map((article) => {
                        return getArticle(article);
                    })}
                </div>
            )
        }
        else {
            return (<p>No articles found...</p>)
        }
    }
    
    function getArticle(article) {
        const link = `/articles/${article.article_id}`;
        return (
            <div key={article.article_id} className="pad-full card">
                <fieldset>
                    <Link to={link} key={article.article_id}>
                        <p className='bold'>{article.title}</p>
                        <p>Topic: {article.topic}</p>
                        <p>Author: {article.author} </p>
                        <p>Created On: {article.created_at} </p>
                        <p>Votes: {article.votes} </p>
                        <p>Comments: {article.comment_count} </p>
                        <img src={article.article_img_url} className="image-small" alt={`Image of ${article.title}`} />
                    </Link>
                </fieldset>
            </div>
        );
    }

    function getResult() {
        if(isLoading) {
            return (<h2>Loading articles.....</h2>)
        }
        else if(errStatus) {
            return (<ErrorPage />) 
        }
        else {
            return (<>
                <h2>News Articles</h2>
                {getArticles(articles)}
            </>);
        }
    }

    return getResult();
};

export default ArticleList;