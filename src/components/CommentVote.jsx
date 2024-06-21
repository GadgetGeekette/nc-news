import IconButton from '@mui/material/IconButton'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, useEffect } from 'react';
import {updateCommentVote} from '../utils/api'

// TODO: after user login implemented, prevent user voting multiple times across different sessions

function CommentVote({comment}) {

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
        }
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
        ? (<div className="border">
            <h4>Sorry: an error occurred whilst updating your vote, please try again...</h4>
            <p>Error Details:</p>
            <p>{errMessage}</p>
        </div>)

        : (<div>
            <div>Votes: {votes}</div>
            <IconButton size="small" onClick={handleClick}>
                {getIcon()}
            </IconButton>
        </div>)
}

export default CommentVote;