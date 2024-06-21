import { fetchTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Topics = (({setTopic}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const [topics, setTopics] = useState([]);
    // const [highlighting, setHighlighting] = useState([]);

    // useEffect(() => {
    //     setHighlighting(getHighlights(topic));
    // }, [topic]);

    useEffect(() => {
        setIsLoading(true);
        fetchTopics()
            .then((topicData) => {
                setTopics(topicData);
                // getHighlights('all');
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

    // function getHighlights(slug) {
    //     let highlitTopics = [];

    //     // Add all articles
    //     if(!slug || slug === 'all') {
    //         highlitTopics.push({
    //             slug: 'all',
    //             highlit: true
    //         });
    //     }
    //     else {
    //         highlitTopics.push({
    //             slug: 'all',
    //             highlit: false
    //         });
    //     }

    //     // Add topics
    //     for (let i = 0; i < topics.length; i++) {
    //         if(topics[i].slug === topic) {
    //             highlitTopics.push({
    //                 slug: topics[i].slug,
    //                 highlit: true
    //             });
    //         }
    //         else {
    //             highlitTopics.push({
    //                 slug: topics[i].slug,
    //                 highlit: false
    //             });
    //         }
    //     }
    //     return highlitTopics;
    // }

    function getHighlight(inputSlug) {
        // const isHighlighted = highlighting.map((slug) => {
        //     if(slug.slug === inputSlug) {
        //         return slug.highlit
        //     }
        // });
        
        // if(isHighlighted[0] || inputSlug === 'sample') {
        //     return 'light-blue-background txt-wht';
        // }
        return '';
    }

    // TODO: move to utils folder and add TDD
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function handleClick(event) {
        const selectedTopic = event.target.innerHTML.toLowerCase();
        if(selectedTopic === 'all topics') {
            setTopic(null);
        }
        else {
            setTopic(selectedTopic);
        }
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
                <Link to={`/articles`} key='sample' className={`pad-sides curved ${getHighlight('sample')}`} state={{topic: 'all'}} underline='always'>Selected Topic Sample</Link>
                <Link onClick={handleClick} to={`/articles`} key='all' className={`pad-sides curved ${getHighlight}`} state={{topic: 'all'}} underline={getHighlight('all')} value={null}>All Topics</Link>
                {topics.map((topic) => {
                    return <Link onMouseDown={handleClick} to={`/articles`} key={topic.slug} className={`pad-sides curved ${getHighlight}`} state={{topic: topic.slug}} underline={getHighlight(topic.slug)} value={topic.slug}>{capitalize(topic.slug)}</Link>;
                })}
            </div>)
        }
    }

    return getResult();
});

export default Topics;

export function SelectedTopic({setTopic}) {
    return setTopic;
}
