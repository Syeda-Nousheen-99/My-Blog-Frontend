// import React, { useContext, useEffect, useState } from 'react'
// import PostAuther from '../components/PostAuther'
// import { Link, useParams } from 'react-router-dom'
// import Loader from '../components/Loader'
// import DeletePost from './DeletePost'
// import { UserContext } from '../context/userContext'

// const PostDetail = () => {
//   const { id } = useParams()
//   const [post, setPost] = useState(null)
//   const [creatorID, setCreatorID] = useState(null)
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)

//   const { currentUser } = useContext(UserContext);

//   useEffect(() => {
//     const getPost = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, { withCredentials: true });
//         setPost(response.data)
//         setCreatorID(response.data.creator)
//       } catch (error) {
//         setError(error)
//       }
//       setIsLoading(false)
//     }

//     getPost();

//   }, [])

//   if (isLoading) {
//     return <Loader />
//   }

//   return (
//     <section className='post_detail'>
//     {error && <p className='error'>{error.message || "An error occurred"}</p>}
//       {post && <div className='container post_detail_container'>
//         <div className='post_detail_header'>
//           <PostAuther />
//           {currentUser?.id == post?.creator &&
//             <div className='post_detail_btn'>
//               <Link to={`/posts/werwer/edit`} className='btn edit'>Edit</Link>
//               <DeletePost />
//             </div>
//           }
//         </div>
//         <h1>This is the post title</h1>
//         <div className='post_detail_thumbnail'>
//           <img src="" alt='' />
//         </div>

//       </div>}
//     </section>
//   )
// }

// export default PostDetail


import React, { useContext, useEffect, useState } from 'react';
import PostAuther from '../components/PostAuther';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, { withCredentials: true });
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='post_detail'>
      {error && <p className='error' style={{marginTop: '500px'}}>{error.message || "An error occurred"}</p>}
      {post && (
        <div className='container post_detail_container'>
          <div className='post_detail_header'>
            <PostAuther autherID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className='post_detail_btn'>
                <Link to={`/posts/${post?._id}/edit`} className='btn edit'>Edit</Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className='post_detail_thumbnail'>
            <img src={post.thumbnail} alt={post.title} />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
