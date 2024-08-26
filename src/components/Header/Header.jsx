import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import '../../App.css';
import { UserContext } from '../../context/userContext';
import { CircularProgress } from '@mui/material';
import UserAvatar from '../../images/user.png'; // Default placeholder avatar
import axios from 'axios';

const Header = ({ userName }) => {
  const [isNavShow, setIsNevShow] = useState(window.innerWidth > 800);
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  const defaultAvatar = UserAvatar;

  useEffect(() => {
    const getAuthor = async () => {
      if (currentUser?.id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`,
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
  }, [currentUser?.id]);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNevShow(false);
    } else {
      setIsNevShow(true);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleClose = () => {
    setToggle(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.user-icon') === null) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav>
      <div className='container nav_container'>
        <button className='nav_toggle-btn' onClick={() => setIsNevShow(!isNavShow)}>
          {isNavShow ? <AiOutlineClose /> : <IoMenu />}
        </button>
        <Link to="/" className='logo' onClick={closeNavHandler}>
          My <sub className='sub'>Blog</sub>
        </Link>

        {isNavShow && (
          <ul className='nav_menu'>
            {currentUser?.id ? (
              <>
                <li><Link className='menu' to='/create' onClick={closeNavHandler}>Create Post</Link></li>
                <li><Link className='menu' to='/authors' onClick={closeNavHandler}>Authors</Link></li>
              </>
            ) : (
              <li><Link className='menu' to='/authors' onClick={closeNavHandler}>Authors</Link></li>
            )}
          </ul>
        )}

        {currentUser?.id ? (
          <div className="user-icon">
            <div style={{ background: 'transparent', position: 'relative' }}>
              <div onClick={handleToggle} style={{ cursor: 'pointer', display: 'inline-block' }}>
                {loading ? (
                  <CircularProgress size={24} /> // Spinner while loading
                ) : (
                  <img 
                    src={author.avatar || defaultAvatar}
                    alt={`${author.name || 'User'}'s Avatar`}
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                    onError={(e) => e.target.src = defaultAvatar}
                  />
                )}
              </div>
              {toggle && (
                <div className="dropdown-menu" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'rgb(27, 31, 59)',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}>
                  <ul>
                    <li><Link className='toggle_menu' to={`/profile/${currentUser.id}`} onClick={handleClose}>Profile</Link></li>
                    <li><Link className='toggle_menu' to={`/myposts/${currentUser.id}`} onClick={handleClose}>Dashboard</Link></li>
                    <li><Link className='toggle_menu' to='/logout' onClick={handleClose}>Logout</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link className='login-btn' style={{ background: '#fff', textDecoration: 'none', padding: '5px 10px', color: '#1B1F3B', borderRadius: '10px', fontWeight: 'bold' }} to='/login' onClick={closeNavHandler}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
