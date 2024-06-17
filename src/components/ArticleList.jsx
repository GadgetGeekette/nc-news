import { useState, useEffect } from 'react';
import { fetchArticles } from "./api";
import { useParams, Link } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext'
// import { useContext } from 'react'

const ArticleList = () => {

    console.log('--sanity check')

    // const {user} = useContext(UserContext);
    const {sorting} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchArticles(sorting)
        .then((articleData) => {
            setArticles(articleData);
            setIsLoading(false);
        });
    }, [sorting]);

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
            <li key={article.article_id} className="card">
                <fieldset>
                    <Link to={link} key={article.article_id}>
                        <p className='bold'>{article.title}</p>
                        <p>Topic: {article.topic}</p>
                        <p>Author: {article.author} </p>
                        <p>Created On: {article.created_at} </p>
                        <p>Votes: {article.votes} </p>
                        <p>Comments: {article.comment_count} </p>
                        <img src={article.article_img_url} className="image" alt={`Image of ${article.title}`} />
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