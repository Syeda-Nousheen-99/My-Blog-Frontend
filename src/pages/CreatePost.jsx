// import React, { useContext, useEffect, useState } from 'react';
// import { TextField } from '@mui/material';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { UserContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Alert from './Alert'; // Import the Alert component
// import Loader from '../components/Loader';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('Uncategorized');
//   const [description, setDescription] = useState('');
//   const [thumbnail, setThumbnail] = useState('');
//   const [error, setError] = useState('');
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertType, setAlertType] = useState(''); // 'success' or 'error'
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false)
//   const { currentUser } = useContext(UserContext);
//   const token = currentUser?.token;

//   // Redirect to login page for users who aren't logged in
//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     }
//   }, [token, navigate]);

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   };

//   const formate = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image',
//   ];

//   const POST_CATEGORY = [
//      "Uncategorized", "Agriculture", "Bussiness", "Education", "Programming", "Weather", "Investment", "Art", "Entertainment"
//   ];

//   const textFieldStyles = {
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: '#EDEDED',
//       },
//       '&:hover fieldset': {
//         borderColor: '#EDEDED',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#1B1F3B',
//       },
//       '& input': {
//         color: '#EDEDED',
//       },
//     },
//     '& .MuiInputLabel-root': {
//       color: '#EDEDED',
//     },
//     '& .MuiInputLabel-root.Mui-focused': {
//       color: '#EDEDED',
//     },
//   };

//   const inputLabelProps = {
//     style: { color: '#EDEDED' },
//   };

//   const createPost = async (e) => {
//     e.preventDefault();
//     setIsLoading(true)

//     const postData = new FormData();
//     postData.set('title', title);
//     postData.set('category', category);
//     postData.set('description', description);
//     postData.set('thumbnail', thumbnail);

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 201) {
//         setAlertMessage('Post created successfully.');
//         setAlertType('success');

//         setTimeout(() => {
//           navigate('/');
//         }, 2000); // Delay navigation for 2 seconds to show alert
//       }
//       setIsLoading(false)
//     } catch (err) {
//       setError(err.response.data.message);
//       setAlertMessage('Failed to create post.');
//       setAlertType('error');
//     }
//   };

//   const closeAlert = () => {
//     setAlertMessage('');
//     setAlertType('');
//   };

//   if(isLoading) {
//     return <Loader />
//   }

//   return (
//     <section className='create_post'>
//       <div className='container create_container'>
//         <h1>Create Post</h1>

//         <form className='forms create_post_form' onSubmit={createPost}>
//           {error && <p className='form_error_msg'>{error}</p>}
//           <TextField
//             label="Create post"
//             name="name"
//             type='text'
//             margin="normal"
//             variant="outlined"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             InputLabelProps={inputLabelProps}
//             sx={textFieldStyles}
//             autoFocus
//           />
//           <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
//             {POST_CATEGORY.map(cat => <option key={cat}>{cat}</option>)}
//           </select>
//           <ReactQuill className='ql-editer' modules={modules} formate={formate} value={description} onChange={setDescription} />
//           <input style={{ margin: '10px 0', color: 'white' }} type='file' onChange={e => setThumbnail(e.target.files[0])} accept='jpg, png, jpeg' />
//           <button style={{ color: 'white', marginBottom: '10px' }} type='submit' className='btn'>Create Post</button>
//         </form>

//         {/* Display Alert */}
//         <Alert message={alertMessage} type={alertType} onClose={closeAlert} />
//       </div>
//     </section>
//   );
// };

// export default CreatePost;


import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert'; // Import the Alert component

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for users who aren't logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formate = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  const POST_CATEGORY = [
     "Uncategorized", "Agriculture", "Bussiness", "Education", "Programming", "Weather", "Investment", "Art", "Entertainment"
  ];

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
        color: '#EDEDED',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#EDEDED',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#EDEDED',
    },
  };

  const inputLabelProps = {
    style: { color: '#EDEDED' },
  };

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        setAlertMessage('Post created successfully.');
        setAlertType('success');

        setTimeout(() => {
          navigate('/');
        }, 2000); // Delay navigation for 2 seconds to show alert
      }
    } catch (err) {
      setError(err.response.data.message);
      setAlertMessage('Failed to create post.');
      setAlertType('error');
    }
  };

  const closeAlert = () => {
    setAlertMessage('');
    setAlertType('');
  };

  return (
    <section className='create_post'>
      <div className='container create_container'>
        <h1>Create Post</h1>

        <form className='forms create_post_form' onSubmit={createPost}>
          {error && <p className='form_error_msg'>{error}</p>}
          <TextField
            label="Create post"
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
            {POST_CATEGORY.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill className='ql-editer' modules={modules} formate={formate} value={description} onChange={setDescription} />
          <input style={{ margin: '10px 0', color: 'white' }} type='file' onChange={e => setThumbnail(e.target.files[0])} accept='jpg, png, jpeg' />
          <button style={{ color: 'white', marginBottom: '10px' }} type='submit' className='btn'>Create Post</button>
        </form>

        {/* Display Alert */}
        <Alert message={alertMessage} type={alertType} onClose={closeAlert} />
      </div>
    </section>
  );
};

export default CreatePost;
