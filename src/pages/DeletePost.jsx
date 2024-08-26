

import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Alert from './Alert'; 
import Loader from '../components/Loader';

const DeletePost = ({ postId: id }) => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for users who aren't logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setAlertMessage('Post deleted successfully.');
        setAlertType('error'); // Red alert for delete action

        // Delay navigation to show the alert for a short period
        setTimeout(() => {
          if (location.pathname === `/myposts/${currentUser.id}`) {
            navigate(0); // Refresh the page
          } else {
            navigate('/');
          }
        }, 2000); // Delay for 2 seconds
      }
      setIsLoading(false)
    } catch (error) {
      setAlertMessage("Couldn't delete post.");
      setAlertType('error');
    }
  };

  const closeAlert = () => {
    setAlertMessage('');
    setAlertType('');
  };

  if(isLoading) {
    return <Loader />
  }

  return (
    <>
      <Link className="btn dlt" onClick={removePost}>
        Delete
      </Link>
      <Alert message={alertMessage} type={alertType} onClose={closeAlert} />
    </>
  );
};

export default DeletePost;
