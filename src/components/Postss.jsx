// import React, { useEffect, useState } from 'react'
// import PostItem from './PostItem'
// import Loader from './Loader'
// import '../index.css'
// import { DUMMY_POSTS } from '../data'
// import axios from 'axios'



// const Postss = () => {
//   const [Post, setPost] = useState(DUMMY_POSTS)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() =>{
//     const fetchPost = async () =>{
//       setIsLoading(true);
//       try{
//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, { withCredentials: true }); 
//         setPost(response?.data)
//       } catch(err) {
//         console.log(err);
//       }  finally {
//         setTimeout(() => {
//             setIsLoading(false);
//         }, 3000);
//     }
//     }
//     fetchPost();
//   }, [])

//   if(!isLoading) {
//     return <Loader />
//   }

//   return (
//     <section className='posts'>
//       {Post.length > 0 ? <div className='container post_container'>
//         {
//           Post.map(({ id, thumbnail, title, category, desc, autherID, createdAt }) => <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} autherID={autherID} createdAt={createdAt} />)
//         }
//       </div> : <h2 className='center'>No posts founds</h2> }
      
//     </section>

//   )
// }

// export default Postss


import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Loader from './Loader';
import '../index.css';
import axios from 'axios';

const Postss = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial state should indicate loading

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`, { withCredentials: true });
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
};

export default Postss;
