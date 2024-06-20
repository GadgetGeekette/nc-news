import { fetchTopics } from './api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Topics = (() => {

    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const [topics, setTopics] = useState([]);

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
                {topics.map((topic) => {
                    return <Link to={`/articles`} key={topic.slug} className='pad-right' state={{topic: topic.slug}}>{topic.slug}</Link>;
                })}
            </div>)
        }
    }

    return getResult();
});

export default Topics;
