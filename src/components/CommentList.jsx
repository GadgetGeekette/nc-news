import { useEffect, useState } from 'react';
import { fetchComments } from '../utils/api';
import { useParams } from 'react-router-dom';
import CommentVote from './CommentVote';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteComment } from '../utils/api';
import '../styling/comment.css';

function CommentList({id}) {
    
    const {user} = useContext(UserContext);
    const {articleId} = useParams();
    const [comments, setComments] = useState([]);
    const [delErrMessage, setDelErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [loadingErrMessage, setloadingErrMessage] = useState('');
    const [deleted, setDeleted] = useState(false);
    const selectedArticleId = id ? id : articleId;

    useEffect(() => {
        if (selectedArticleId) {
            setIsLoading(true);
            setloadingErrMessage('');
            setDelErrMessage('');
            fetchComments(selectedArticleId)
            .then((commentData) => {
                if(!commentData) {
                    throw('');
                }
                setComments(commentData);
                setIsLoading(false);
            })
            .catch((err) => {
                const errMsg = err.msg
                ? err.msg
                : 'An unknown error occurred whilst loading comments';
                setloadingErrMessage(errMsg);
                setIsLoading(false);
            });
        }
    }, [selectedArticleId, deleted]);

    function getComment(comment) {
        return (
            <li key={comment.comment_id}>
                <div className='comments border'>
                    <p className='bold'>{comment.author} - {comment.created_at}</p>
                    <p className='border'>{comment.body}</p>
                    <CommentVote comment={{id:comment.comment_id,voteCount:comment.votes}} />
                    {getDeleteButton(comment.comment_id, comment.author)}
                </div>
                <br />
            </li>
        )
    }

    function getDeleteButton(commentId, username) {
        if(user.username === username) {
            // Only allow deletion for current user
            return delErrMessage
                ? (<div>
                    <h4>Sorry: an error occurred whilst deleting your comment, please try again...</h4>
                    <p>Error Details:</p>
                    <p>{delErrMessage}</p>
                </div>)

                : (<IconButton size="small" onClick={() => handleDeleteClick(commentId)}>
                    <DeleteIcon />
                </IconButton>);
        }
        return (<></>);
    }

    function handleDeleteClick(commentId) {
        setDelErrMessage('');
        deleteComment(commentId)
            .then(() => {
                setDeleted(!deleted)
            })
            .catch((err) => {
                const errMsg = err.msg
                    ? err.msg
                    : 'An unknown error occurred';
                setDelErrMessage(errMsg);
            });
    }

    function getResult() {
        if(isLoading) {
            return (<h2>Loading comments.....</h2>)
        }
        else if(loadingErrMessage) {
            return (<div className="border">
                <h4>Sorry: an error occurred whilst loading comments...</h4>
                <p>Error Details:</p>
                <p>{loadingErrMessage}</p>
            </div>)
        }
        else {
            return (<section>
                <h3 className='bold'>Comments</h3>
                <ul>
                    {comments.map((comment) => {
                        return getComment(comment);
                    })}
                </ul>
            </section>)
        }
    }

    return getResult();
}

export default CommentList;
