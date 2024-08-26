import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdEditSquare } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { TextField } from '@mui/material'
import { UserContext } from '../context/userContext';
import defaultAvatar from '../images/user.png'
import axios from 'axios';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for user who isn't logged in
  useEffect(() =>{
    if(!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() =>{
    const getUser = async () =>{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      const {name, email, avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    getUser();
  }, [])

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#EDEDED',
      },
      '&:hover fieldset': {
        borderColor: '#EDEDED',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1B1F3B',
      },
      '& input': {
        color: '#EDEDED', // placeholder color
      }
    },
    '& .MuiInputLabel-root': {
      color: '#EDEDED',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#EDEDED',
    }
  }

  const inputLabelProps = {
    style: { color: '#EDEDED' }
  }


  const changeAvatar =  async() =>{
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/change-avatar`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error);
      
    }
  }

  const updateUserDetail = async(e) =>{
    e.preventDefault();
    try {
      const userDate = new FormData();
    userDate.set('name', name);
    userDate.set('email', email);
    userDate.set('currentPassword', currentPassword);
    userDate.set('newPassword', newPassword);
    userDate.set('confirmNewPassword', confirmNewPassword)

    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`, userDate, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    if(response.status == 200) {
      //log user out
      navigate('/logout')
    }
    } catch (error) {
      setError(error.response.data.message);
      
    }
  }

  return (
    <section className='profile'>
      <div className='container profile_container'>
        <Link to={`/myposts/${currentUser.id}`} className='btnn my_post'>My Posts</Link>
        <div className='profile_detail'>
          <div className='avatar_wrapper'>
            <div className='profile_avatar'>
              <img src={avatar || defaultAvatar} alt='' />
            </div>
            {/* Form to update avatar */}
            <form className='avatar_form'>
              <input type='file' name='avatar' id='avatar' accept='png,jpg,jpeg' onChange={e => setAvatar(e.target.files[0])} />
              <label htmlFor='avatar' onClick={() => setIsAvatarTouched(true)}><MdEditSquare /></label>
            </form>
            {isAvatarTouched && <button className='profile_vatar_btn' onClick={changeAvatar}><FaCheck /></button>}
          </div>
          <h1>{currentUser.name}</h1>
          {/* form to update user detail */}
          <form className='forms profile_form' onSubmit={updateUserDetail}>
          {error && <p className='form_error_msg'>{error}</p>}
            <TextField
              label="Full Name"
              name="name"
              margin="normal"
              variant="outlined"
              value={name}
              onChange={e => setName(e.target.value)}
              InputLabelProps={inputLabelProps}
              sx={textFieldStyles}
            />
            <TextField
              label="Email"
              name="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputLabelProps={inputLabelProps}
              sx={textFieldStyles}
            />
            <TextField
              label="Current Password"
              name="currentPassword"
              margin="normal"
              variant="outlined"
              type='password'
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              InputLabelProps={inputLabelProps}
              sx={textFieldStyles}
            />
            <TextField
              label="New Password"
              name="newPassword"
              margin="normal"
              variant="outlined"
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              InputLabelProps={inputLabelProps}
              sx={textFieldStyles}
            />
            <TextField
              label="Confirm New Password"
              name="confirmNewPassword"
              margin="normal"
              variant="outlined"
              type='password'
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              InputLabelProps={inputLabelProps}
              sx={textFieldStyles}
            />
            <button style={{ color: 'white', marginBottom: '10px' }} type='submit' className='btn'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
