
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert'; // Import the Alert component

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [alertType, setAlertType] = useState(''); // State for alert type
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    setAlertMessage(''); // Clear alert before new registration attempt
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData, { withCredentials: true });
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setAlertType('error');
        setAlertMessage("Couldn't register user. Please try again.");
      } else {
        setAlertType('success');
        setAlertMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setAlertType('error');
      setAlertMessage(err.response?.data?.message || 'An error occurred during registration.');
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage(''); // Clear alert when closed
  };

  return (
    <section className='register'>
      <div className='container register_container'>
        <h2 style={{ color: 'white' }}>Sign Up</h2>
        {alertMessage && (
          <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />
        )}
        <form className='form register_form' onSubmit={registerUser}>
          <TextField
            label="Full Name"
            name="name"
            margin="normal"
            variant="outlined"
            value={userData.name}
            onChange={changeInputHandler}
            InputLabelProps={{
              style: { color: '#1B1F3B' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&:hover fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1B1F3B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1B1F3B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1B1F3B',
              }
            }}
          />
          <TextField
            label="Email"
            name="email"
            margin="normal"
            variant="outlined"
            value={userData.email}
            onChange={changeInputHandler}
            InputLabelProps={{
              style: { color: '#1B1F3B' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&:hover fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1B1F3B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1B1F3B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1B1F3B',
              }
            }}
          />
          <TextField
            label="Password"
            name="password"
            margin="normal"
            type='password'
            variant="outlined"
            autoComplete='off'
            value={userData.password}
            onChange={changeInputHandler}
            InputLabelProps={{
              style: { color: '#1B1F3B' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&:hover fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1B1F3B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1B1F3B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1B1F3B',
              }
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            margin="normal"
            type='password'
            variant="outlined"
            autoComplete='off'
            value={userData.confirmPassword}
            onChange={changeInputHandler}
            InputLabelProps={{
              style: { color: '#1B1F3B' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&:hover fieldset': {
                  borderColor: '#1B1F3B',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1B1F3B',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#1B1F3B',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#1B1F3B',
              }
            }}
          />
          <button style={{ color: 'white', marginBottom: '10px' }} type='submit' className='btn'>Register</button>
          <small style={{ color: 'black' }}>Already have an account? <Link to='/login' className='log_link'>Login</Link></small>
        </form>
      </div>
    </section>
  );
};

export default Register;
