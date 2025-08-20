import { useContext, useEffect } from "react";
import { blogContext } from "../../blogContext.js";
import Blog_preview from "../Blog_preview/Blog_preview.jsx";
import { v4 as uuidv4 } from 'uuid';
import styles from './Home.module.css';
import { Link } from "react-router-dom";

const Home = () => {
    const { posts } = useContext(blogContext);
    
    function UpdatePublishStatus(published, id) {

        let data = {published: published, id: id};
        fetch(`https://blog-api-c5kc.onrender.com/posts/${id}`, { 
            mode: "cors",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
            })
            .then(() => {
                console.log('Post publish status successfully updated');
                window.location.reload();
            })
            .catch (error => {
                console.error(`There was an error with fetch operation:`, error);
            }) 
    }
    return (
        <div className={styles.homePage}>
            <h1 className={styles.homeTitle}>All Blogs</h1>

            <div className={styles.posts}>
                {
                    posts.map((post, i) => {
                        return (
                            <div key={uuidv4()}>
                            
                            <Link to={`/posts/${i}`} state={{post: post}} >
                                <Blog_preview
                                    key={uuidv4()}
                                    post={post}
                                />


                            </Link> 
                                <span>
                                    <h1>Status:
                                    </h1>
                                        {post.published ? (
                                            <>
                                            <span>Published</span>
                                            <button className={styles.publishButton} onClick={() => UpdatePublishStatus(post.published, post.id)}>Unpublish</button>
                                            </>
                                        ):
                                        (   
                                            <>
                                                <span>Unpublished</span>
                                                <button className={styles.publishButton} onClick={() => UpdatePublishStatus(post.published, post.id)}>publish</button>
                                            </>
                                        )
                                        }
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home; 
