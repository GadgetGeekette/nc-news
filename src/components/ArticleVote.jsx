import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, useEffect } from 'react';
import {updateArticleVote} from '../utils/api'

// TODO: after user login implemented, prevent user voting multiple times across different sessions

function ArticleVote({article}) {
    
    const [votesCount, setVotesCount] = useState(article.voteCount);
    const [incrVote, setIncrVote] = useState(-1);
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setVotesCount(article.voteCount);
    }, [article])

    function handleClick() {
        const incrVoteVal = incrVote === -1
            ? 1
            : -1;
        setVotesCount(article.voteCount + incrVoteVal) // optimistic rendering
        setIncrVote(incrVoteVal);
        updateArticleVote(article.id, incrVoteVal)
            .then((articleData) => {
                setVotesCount(articleData.votes);
            })
            .catch((err) => {
                const errMsg = err.msg
                    ? err.msg
                    : 'An unknown error occurred';
                setErrMessage(errMsg);
            });
    }

    function getIcon() {
        return incrVote <= 0
            ? (<ThumbUpOffAltIcon />)
            : (<ThumbUpAltIcon />);
    }

    return errMessage
        ? (<div className="border">
            <h4>Sorry: an error occurred whilst updating your vote, please try again...</h4>
            <p>Error Details:</p>
            <p>{errMessage}</p>
        </div>)

        : (<div>
            <div>Votes: {votesCount}</div>
            <IconButton size="small" onClick={handleClick}>
                {getIcon()}
            </IconButton>
        </div>)
}

export default ArticleVote;