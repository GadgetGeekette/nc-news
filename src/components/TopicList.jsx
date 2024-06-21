import { fetchTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Topics = (({topic}) => {

    // TODO: update BE to have slug embedded in the url not the JSON body

    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getHighlights(topic);
    }, [topic]);

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

    function getHighlights() {
        let slugs = [];

        if(topic === 'all') {
            slugs.push({
                slug: 'all',
                highlit: true
            });
        }
        else {
            slugs.push({
                slug: 'all',
                highlit: false
            });
        }

        for (let i = 0; i < topics.length; i++) {
            if(topics[i].slug === topic) {
                slugs.push({
                    slug: topics.slug,
                    highlit: true
                });
            }
            else {
                slugs.push({
                    slug: topics.slug,
                    highlit: false
                });
            }
        }
        return slugs;
    }

    function getHighlight(slug) {
        console.log(slug, '--slug')
        if(!topic && slug === 'all'
            || topics.slug && slug === topics.slug) {
                console.log('always')
                return 'always';
        }
        console.log('none')
        return '';
    }

    // TODO: move to utils folder and add TDD
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
                {/* <Link to={`/articles`} key='all' className='pad-sides light-blue-background curved' state={{topic: 'all'}} underline='always'>All Topics</Link> */}
                <Link to={`/articles`} key='all' className={`pad-sides curved ${getHighlight}`} state={{topic: 'all'}} underline={getHighlight('all')}>All Topics</Link>
                {topics.map((topic) => {
                    return <Link to={`/articles`} key={topic.slug} className='pad-sides curved' state={{topic: topic.slug}} underline={getHighlight(topic.slug)}>{capitalize(topic.slug)}</Link>;
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
