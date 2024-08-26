import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const {category} = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`, { withCredentials: true });
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='posts'>
      {posts.length > 0 ? (
        <div className='container post_container'>
          {posts.map(({ _id, thumbnail, title, category, description, creator, createdAt }) => (
            <PostItem
              key={_id}
              postID={_id}
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

export default CategoryPost
