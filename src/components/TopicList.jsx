import { fetchTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Topics = (({setTopic}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchTopics()
            .then((topicData) => {
                setTopics(topicData);
            })
            .catch((err) => {
                const errMsg = err.msg
                    ? err.msg
                    : 'An unknown error occurred';
                setErrMessage(errMsg);
                setIsLoading(false);
            });
        setIsLoading(false);
    }, []);

    function getHighlight(inputSlug) {
        if(inputSlug === selectedTopic) {
            return  'light-blue-background txt-wht';
        }
        return '';
    }

    // TODO: move to utils folder and add TDD
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function handleClick(event) {
        let selectedTopic = event.target.innerHTML.toLowerCase();
        if(selectedTopic === 'all topics') {
            selectedTopic = null;
        }
        setTopic(selectedTopic);
        setSelectedTopic(selectedTopic);
    }

    function getResult() {
        if(isLoading) {
            return (<h2>Loading comments.....</h2>)
        }
        else if(errMessage) {
            return (<div className="border">
                <h4>An error occurred whilst retrieving topics, please try again later...</h4>
                <p>Error Details:</p>
                <p>{errMessage}</p>
            </div>)
        }
        else {
            return (<div className="banner">
                <Link onClick={handleClick} to={`/articles`} key='all' className={`pad-sides curved ${getHighlight}`}>All Topics</Link>
                {topics.map((topic) => {
                    return <Link onMouseDown={handleClick} to={`/articles`} key={topic.slug} className={`pad-sides curved ${getHighlight}`}>{capitalize(topic.slug)}</Link>;
                })}
            </div>)
        }
    }

    return getResult();
});

export default Topics;

