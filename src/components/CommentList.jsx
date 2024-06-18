// import { UserContext } from '../contexts/UserContext';
// import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { fetchComments } from './api';
import { useParams } from 'react-router-dom';

function CommentList(id) {
    // const {user} = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const {articleId} = useParams();
    const selectedId = id
        ? id
        : articleId;
    console.log(selectedId, '--selected id')

    useEffect(() => {
        if (selectedId) {
            fetchComments(selectedId)
            .then((commentData) => {
                setComments(commentData);
            });
        }
    }, [selectedId]);

    function getComment(comment) {
        return (<>
            <li key={comment.comment_id} className='comments border'>
                <p>Author: {comment.author}, created on: {comment.created_at}</p>
                <p className='border'>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                {/* TODO add button component to increase votes */}
                {/* TODO add button component to delete comment if author is current user */}
            </li>
            <br></br>
        </>
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