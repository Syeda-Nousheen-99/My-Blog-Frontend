import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../images/user.png'; // Default placeholder avatar
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // Importing MUI Spinner

const defaultAvatar = UserAvatar;

const PostAuther = ({ autherID, createdAt }) => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuthor = async () => {
      if (autherID) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/${autherID}`,
            { withCredentials: true }
          );
          setAuthor(response.data);
        } catch (err) {
          console.log('Error fetching author:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    getAuthor();
  }, [autherID]);

  return (
    <Link className='post_auther' to={`/posts/users/${autherID}`}>
      <div className='post_auther_avatar'>
        {loading ? (
          <CircularProgress size={24} /> // Show spinner while loading
        ) : (
          <img
            src={author.
              avatar || defaultAvatar} // Use avatar URL or default avatar
            alt='Avatar'
            onError={(e) => e.target.src = defaultAvatar} // Fallback if image fails to load
          />
        )}
      </div>
      <div className='post_auther_detail'>
        <h5>By: {author.name || 'Unknown'}</h5>
        <small>{new Date(createdAt).toLocaleString()}</small>
      </div>
    </Link>
  );
};

export default PostAuther;
