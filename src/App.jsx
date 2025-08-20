import './App.css'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { blogContext } from './blogContext.js';

const usePosts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://blog-api-c5kc.onrender/posts", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setPosts(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // console.log('posts: ', posts);
  return { posts, error, loading };
};
function App() {
  const { posts, error, loading } = usePosts();

  const [ loggedIn, setLoggedIn ] = useState(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn');
    return savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
  })

  // console.log('App.js loggedIn: ', loggedIn);

  const [ authorId, setAuthorId ] = useState(() => {
    const savedAuthorId = localStorage.getItem('authorId');
    return savedAuthorId ? JSON.parse(savedAuthorId) : 0;
  })

  // console.log(authorId);      

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  // console.log('loggedIn: ', loggedIn);  
  
  return (
    <>
      <nav>
        <b className="Title">Sarfroz's Blog</b>
        <div className="pages">
          <span>
            <Link to="/" className="link">
              Home
            </Link>
          </span>
          <span><a href="https://github.com/smsarfroz/Blog-API">github</a></span>
        </div>
        <div className="userState">
          {
            loggedIn ? (
              <>
                <h2>author~sarfroz</h2>
                <span>
                  <Link to="/addPost" className="link">
                    New Post
                  </Link>
                </span>

                <span>
                  <Link to="/signup" className="link">
                    Log out
                  </Link>
                </span>
              </>
            ) : (
              
              <>
                <span>
                  <Link to="/signup" className="link">
                    Sign up
                  </Link>
                </span>
                <span>
                  <Link to="/login" className="link">
                    Login
                  </Link>
                </span>
                
              </>
            )
          }
          
        </div>
      </nav>

      <div className="commonBackground">
        <blogContext.Provider value={{posts, loggedIn, setLoggedIn, authorId, setAuthorId}}>
          <Outlet />
        </blogContext.Provider>
      </div>
    </>
  )
}

export default App;

