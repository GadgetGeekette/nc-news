import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, useEffect } from 'react';
import {updateArticleVote} from './api'

// TODO: after user login implemented, prevent user voting multiple times across different sessions

function ArticleVote({article}) {
    
    const [votes, setVotes] = useState(article.voteCount);
    const [incrVote, setIncrVote] = useState(0);
    const [errMessage, setErrMessage] = useState('');

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
        ? (<div className="border">
            <h4>Sorry: an error occurred whilst updating your vote, please try again...</h4>
            <p>Error Details:</p>
            <p>{errMessage}</p>
        </div>)

        : (<div>
            <div>Votes: {getVotes()}</div>
            <IconButton size="small" onClick={handleClick}>
                {getIcon()}
            </IconButton>
        </div>)
}

export default ArticleVote;