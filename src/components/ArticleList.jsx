import { useState, useEffect } from 'react';
import { fetchArticles } from "../utils/api";
import { Link } from 'react-router-dom';
import { useLocation, useParams } from "react-router-dom";
import ErrorPage from './ErrorPage';

const ArticleList = ({articleListInput}) => {

    // TODO: update BE to have slug embedded in the url not the JSON body

    const {topic} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [errStatus, setErrStatus] = useState(null);
    // const location = useLocation(); // TODO: left in for now as an example of usage
    const sort = articleListInput.sort;
    const setTopic = articleListInput.setTopic;

    useEffect(() => {
        if(topic) {
            setTopic(topic);
        }
        else {
            setTopic('all');
        }
        setIsLoading(true);
        setErrStatus(null);
        const params = {};
        // params.topic = location.state
        //     ? location.state.topic
        //     : null;
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
            setErrStatus(err.response.status);
        });
    }, [topic, setTopic, sort]);

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

    function getResult() {
        if(isLoading) {
            return (<h2>Loading article.....</h2>)
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