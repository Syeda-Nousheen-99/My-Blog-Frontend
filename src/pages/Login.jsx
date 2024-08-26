import React, { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import Alert from './Alert' // Import the Alert component
import Loader from '../components/Loader'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext)

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    setSuccessMessage('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      const user = response.data
      setCurrentUser(user)
      setSuccessMessage('Login successful! ')
      
      setTimeout(() => navigate('/'), 1000) // Redirect after 2 seconds
      setIsLoading(false)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  if(isLoading) {
    return <Loader />
  }

  return (
    <section className='register'>
      <div className='container register_container'>
        <h2 style={{ color: 'white' }}>Login</h2>

        {/* Alert for Success or Error */}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage('')}
          />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            onClose={() => setError('')}
          />
        )}

        <form className='form register_form' onSubmit={loginUser}>
          <TextField
            label='Email'
            name='email'
            margin='normal'
            variant='outlined'
            value={userData.email}
            onChange={changeInputHandler}
            InputLabelProps={{
              style: { color: '#1B1F3B' },
              focused: {
                color: '#1B1F3B',
              },
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
              },
            }}
          />
          <TextField
            label='Password'
            name='password'
            margin='normal'
            type='password'
            variant='outlined'
            autoComplete='false'
            value={userData.password}
            onChange={changeInputHandler}
            InputLabelProps={{
              style: { color: '#1B1F3B' },
              focused: {
                color: '#1B1F3B',
              },
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
              },
            }}
          />
          <button style={{ color: 'white', marginBottom: '10px' }} type='submit' className='btn'>
            Login
          </button>
          <small style={{ color: 'black' }}>
            Don't have an account? <Link to='/register' className='log_link'>Sign Up</Link>
          </small>
        </form>
      </div>
    </section>
  )
}

export default Login
