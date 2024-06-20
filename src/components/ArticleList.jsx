import { useState, useEffect } from 'react';
import { fetchArticles } from "./api";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const ArticleList = ({sort}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        const params = {}; 
        params.topic = location.state
            ? location.state.topic
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
        });
    }, [sort, location]);

    function getArticles(articleList){
        if (articleList) {
            return (
                <ul>
                    {articleList.map((article) => {
                        return getArticle(article);
                    })}
                </ul>
            )
        }
        else {
            return (<p>No articles found...</p>)
        }
    }
    
    function getArticle(article) {
        const link = `/articles/${article.article_id}`;
        return (
            <li key={article.article_id} className="pad-full">
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
            </li>
        );
    }

    return isLoading
    ? (<h2>Loading articles..... </h2>)

    : (<>
        <h2>News Articles</h2>
        {getArticles(articles)}
    </>);
};

export default ArticleList;