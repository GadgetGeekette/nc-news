import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, useEffect } from 'react';
import {updateArticleVote} from './api'

// TODO: after user login implemented, prevent user voting multiple times across different sessions

function ArticleVote({article}) {
    
    console.log(article.voteCount,'--article.voteCount')
    const [votes, setVotes] = useState(article.voteCount);
    const [incrVote, setIncrVote] = useState(0);
    const [errMessage, setErrMessage] = useState('');
    console.log(votes,'--votes')

    useEffect(() => {
        if (incrVote !== 0) {
            updateArticleVote(article.id, incrVote)
                .then((articleData) => {
                    setVotes(articleData.votes);
                })
                .catch((err) => {
                    const errMsg = err.msg
                        ? err.msg
                        : 'An unknown error occurred';
                    setErrMessage(errMsg);
                });
        }
    }, [article, incrVote]);

    function handleClick() {
        const incrVoteVal = incrVote <= 0
            ? 1
            : -1;
        setIncrVote(incrVoteVal);
    }

    function getIcon() {
        return incrVote <= 0
            ? (<ThumbUpOffAltIcon />)
            : (<ThumbUpAltIcon />);
    }

    function getVotes() {
        if (votes) {
            return votes;
        }
        return article.voteCount;
    }

    return errMessage
        ? (<h4>Sorry: an unknown error occurred whilst updating your vote, please try again later...</h4>)

        : (<div>
            <div>Votes: {getVotes()}</div>
            <IconButton size="small" onClick={handleClick}>
                {getIcon()}
            </IconButton>
        </div>)
}

export default ArticleVote;