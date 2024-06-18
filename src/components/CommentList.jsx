// import { UserContext } from '../contexts/UserContext';
// import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { fetchComments } from './api';
import { useParams } from 'react-router-dom';
import Vote from './Vote';

function CommentList(id) {
    // const {user} = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const {articleId} = useParams();
    const selectedId = id
        ? id
        : articleId;

    useEffect(() => {
        if (selectedId) {
            fetchComments(selectedId)
            .then((commentData) => {
                setComments(commentData);
            });
        }
    }, [selectedId]);

    function getComment(comment) {
        return (
            <li key={comment.comment_id}>
                <div className='comments border'>
                    <p className='bold'>{comment.author} - {comment.created_at}</p>
                    <p className='border'>{comment.body}</p>
                    <Vote comment={{id:comment.comment_id,voteCount:comment.votes}} />
                    {/* TODO add button component to delete comment if author is current user */}
                </div>
                <br />
            </li>
        )
    }

    return (<section>
        <h3 className='bold'>Comments</h3>
        <ul>
            {comments.map((comment) => {
                return getComment(comment);
            })}
        </ul>
    </section>)
}

export default CommentList