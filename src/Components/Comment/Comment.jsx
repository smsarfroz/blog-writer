import styles from './Comment.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Comment({comment}) {
    
    const postid = parseInt(useParams().id);
    function handleDelete(cid) {
        console.log('pid cid', postid, cid);
        fetch((`http://localhost:3000/posts/${postid}/comments/${cid}`), {
            mode: "cors",
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            console.log('Comment deleted successfully');
        })
        .catch (error => {
            console.error('There was a problem with fetch operation ', error);
        })
    }
    return (
        <div className={styles.comment}>
            <div className={styles.commentDetails}>
                <h3>{comment.user.username}</h3>
                <p className={styles.date}>{comment.createdAt}</p>
            </div>
            <hr />
            <p>{comment.content}</p>

            <div className={styles.manageComment}>
                <button>Edit</button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Comment;