import { useContext, useEffect } from "react";
import { blogContext } from "../../blogContext.js";
import Blog_preview from "../Blog_preview/Blog_preview.jsx";
import { v4 as uuidv4 } from 'uuid';
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Home = () => {
    const { posts } = useContext(blogContext);
    
    let params = useParams();
    let postid = params.id;
    let id = parseInt(postid);

    function UpdatePublishStatus(published) {

        let data = {published: published};
        useEffect(() => {
            fetch(`http://localhost:3000/posts/${id}`, { 
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
                })
                .catch (error => {
                    console.error(`There was an error with fetch operation:`, error);
                }) 
        }, []);
    }
    return (
        <div className={styles.homePage}>
            <h1 className={styles.homeTitle}>All Blogs</h1>

            <div className={styles.posts}>
                {
                    posts.map((post, i) => {
                        return (
                            <Link to={`/posts/${i}`} state={{post: post}} key={uuidv4()}>
                                <Blog_preview
                                    key={uuidv4()}
                                    post={post}
                                />

                                <span>
                                    <h1>Status:
                                    </h1>
                                        {post.published ? (
                                            <>
                                            <span>Published</span>
                                            <button className={styles.publishButton} onClick={() => UpdatePublishStatus(post.published)}>Unpublish</button>
                                            </>
                                        ):
                                        (   
                                            <>
                                                <span>Unpublished</span>
                                                <button className={styles.publishButton} onClick={() => UpdatePublishStatus(post.published)}>publish</button>
                                            </>
                                        )
                                        }
                                </span>

                            </Link> 
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home; 
