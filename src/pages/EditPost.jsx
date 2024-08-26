import React, { useContext, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Alert from './Alert'



const EditPost = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState("Uncategorized")
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const navigate = useNavigate();
  const {id} = useParams();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for user who isn't logged in
  useEffect(() =>{
    if(!token) {
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3,4,5,6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formate = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const POST_CATEGORY = [
     "Uncategorized", "Agriculture", "Bussiness", "Education", "Programming", "Weather", "Investment", "Art", "Entertainment"
  ]

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

  useEffect(() =>{
    const getPost = async () =>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, { withCredentials: true});
        setTitle(response.data.title)
        setDescription(response.data.description)
        
      }catch(error) {
        console.log(error);
        
      }
    }
    getPost();

  }, [])

  const editPost = async (e) =>{
    e.preventDefault();
    setSuccessMessage('')

    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try{
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, postData, { withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200) {
        setSuccessMessage('Post updated successfully!');
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      }
    } catch(err){
      setError(err.response.data.message)
      
    }
  
  }
  return (
    <section className='create_post'>
      <div className='container create_container'>
        <h1 >Edit Post</h1>
      
        <form className='forms create_post_form' onSubmit={editPost}>
            {/* Alert for Success or Error */}
        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            onClose={() => setSuccessMessage('')}
          />
        )}
        {error && <p className='form_error_msg'>{error}</p>}
          <TextField
            label="Edit post"
            name="name"
            type='text'
            margin="normal"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            InputLabelProps={inputLabelProps}
            sx={textFieldStyles}
            autoFocus
          />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORY.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill className='ql-editer' modules = {modules} formate ={formate} value={description} onChange={setDescription} />
            <input style={{margin: ' 10px 0', color: 'white'}} type='file' onChange={e => setThumbnail(e.target.files[0])} accept ='jpg, png, jpeg' />
            <button style={{ color: 'white', marginBottom: '10px' }} type='submit' className='btn'>Update</button>

        </form>
      </div>
    </section>
  )
}

export default EditPost



