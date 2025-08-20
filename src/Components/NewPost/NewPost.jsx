import styles from './NewPost.module.css';
import { useContext } from 'react';
import { blogContext } from '../../blogContext';

const NewPost = () => {
    const { authorId } = useContext(blogContext);
    // console.log('authorId: ', authorId);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        // console.log('data: ', data);

        fetch("https://blog-api-c5kc.onrender.com/posts", {
            mode: 'cors',
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // console.log('1response: ', response);
            // console.log(typeof response);
            return response.json();
        })
        .then(() => {
            // console.log('response: ', response);
            console.log('post added successfully:');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        })
    }
    return (
        <form action="" onSubmit={handleSubmit}>
        
            <div>
                <label htmlFor="title" id='title'>Title</label>
                <input type="text" name='title'/>
            </div>

            <div>
                <label htmlFor="content" id='content'>Content</label>
                {/* <input type="text" name='content'/> */}
                <textarea name="content" id="content" className={styles.content}></textarea>
            </div>

            <div>
                <label htmlFor="published" id='published'>Publish</label>
                <input type="checkbox" name='published'/>
            </div>
            
            <input type="hidden" value={authorId} name='authorId'/>
            <button type='submit' className={styles.submitButton}>Add Post</button>

        </form>
    )
};

export default NewPost;