import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, useEffect } from 'react';
import {updateCommentVote} from './api'

function Vote({comment}) {
    const [votes, setVotes] = useState(comment.voteCount);
    const [incrVote, setIncrVote] = useState(0);
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        if (incrVote !== 0) {
            updateCommentVote(comment.id, incrVote)
                .then((commentData) => {
                    setVotes(commentData.votes);
                })
                .catch((err) => {
                    const errMsg = err.msg
                        ? err.msg
                        : 'An unknown error occurred';
                    setErrMessage(errMsg);
                });
        };
    }, [comment, incrVote]);

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

    return errMessage
        ? (<h4>Sorry: an unknown error occurred whilst updating your vote, please try again later...</h4>)

        : (<div>
            <div>Votes: {votes}</div>
            <IconButton size="small" onClick={handleClick}>
                {getIcon()}
            </IconButton>
        </div>)
}

export default Vote;