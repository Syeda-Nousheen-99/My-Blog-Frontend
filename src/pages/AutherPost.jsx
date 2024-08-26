import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const AutherPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const {id} = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`, { withCredentials: true });
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setIsLoading(false); 
        }, 3000);
      }
    };
    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='posts'>
      {posts.length > 0 ? (
        <div className='container post_container'>
          {posts.map(({_id: id, thumbnail, title, category, description, creator, createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              desc={description}
              autherID={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className='center'>No posts found</h2>
      )}
    </section>
  );
}

export default AutherPost
