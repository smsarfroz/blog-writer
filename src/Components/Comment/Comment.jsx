import styles from './Comment.module.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Comment({comment, setComments}) {
    
    // console.log('comment: ', comment);
    const [editmode, setEditmode] = useState(false);
    const [updatedVal, setUpdatedVal] = useState(comment.content);
    const postid = parseInt(useParams().id);
    function handleUpdate(cid) {
        
        let data = {};
        data['newContent'] = updatedVal;
        // console.log('data: ', data);
        fetch((`http://blog-api-c5kc.onrender/posts/${postid}/comments/${cid}`), {
            mode: "cors",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setComments((comments) => {
                return comments.map(ct => {
                    if (ct.id == comment.id) {
                        return {...ct, content: updatedVal};
                    } 
                    return ct;
                })
            })
            // console.log('response: ', response);
            console.log('Comment updated successfully');
        })
        .catch (error => {
            console.error('There was a problem with fetch operation ', error);
        })
        
        
        setEditmode(!editmode);
    }

    function handleDelete(cid) {
        fetch((`http://blog-api-c5kc.onrender/posts/${postid}/comments/${cid}`), {
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
        .then((response) => {
            console.log('response: ', response);
            console.log('Comment deleted successfully');
        })
        .catch (error => {
            console.error('There was a problem with fetch operation ', error);
        })
    }

    function handleCancel() {
        setEditmode(!editmode);
    }
    function handleChange(e) {
        setUpdatedVal(e.target.value);
    } 
    function handleEdit() {
        setEditmode(!editmode);
    }
    return (
        <div className={styles.comment}>
            <div className={styles.commentDetails}>
                <h3>{comment.user.username}</h3>
                <p className={styles.date}>{comment.createdAt}</p>
            </div>
            <hr />
            {
                editmode ? (
                    <input type="text" value={updatedVal} onChange={handleChange}/>
                ) : (
                    <p>{comment.content}</p>
                )
            }

            <div className={styles.manageComment}>
                {
                    editmode ? (
                        <>
                            <button onClick={() => handleUpdate(comment.id)}>Update</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Comment;