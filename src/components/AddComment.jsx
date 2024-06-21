import { useState, useEffect } from "react";
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { postComment } from '../utils/api'

const AddComment = (({id}) => {

    const {user} = useContext(UserContext);
    const [commentInput, setCommentInput] = useState('');
    const [commentBody, addComment] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [btnEnabled, setBtnEnabled] = useState('btn-disabled');

    useEffect(() => {
        if (commentBody !== '') {
            setIsLoading(true);
            const comment = {
                username: user.username,
                body: commentBody
            }
            postComment(id, comment)
                .then((commentData) => {
                    addComment(commentData.body);
                    setIsLoading(false);
                })
                .catch((err) => {
                    const errMsg = err.msg
                        ? err.msg
                        : 'An unknown error occurred';
                    setErrMessage(errMsg);
                    setIsLoading(false);
                });
        }
    }, [id, user.username, commentBody])

    function handleSubmit() {
        if (commentInput !== '') {
            addComment(commentInput);
        }
    }
    
    function handleChange(event) {
        setErrMessage('');
        setCommentInput(event.target.value);
        if (event.target.value === '') {
            setBtnEnabled('btn-disabled')
        }
        else{
            setBtnEnabled('btn-enabled');
        }
    }

    function getResult() {
        if(isLoading) {
            return (<h2>Loading.....</h2>);
        }
        else if(errMessage) {
            return (<div className="border">
                <h4>Sorry: an error occurred whilst adding your comment, please try again...</h4>
                <p>Error Details:</p>
                <p>{errMessage}</p>
            </div>);
        }
        else {
            return (<form onSubmit={handleSubmit} className="border">
                <div><label className='align-left bold' htmlFor='add-comment'>Add to the discussion:</label></div>
                <div><textarea placeholder="Enter your comment here" onChange={handleChange} rows="7" className="border add-comment" name="add-comment" id="add-comment" value={commentInput}></textarea></div>
                <div><button type="submit" className={`mid-blue-background ${btnEnabled}`}>Add Comment</button></div>
            </form>);
        }
    }

    return getResult();
});

export default AddComment;
