import React, { useContext, useEffect, useState } from 'react'
import { DUMMY_POSTS } from '../data'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {UserContext} from '../context/userContext'
import axios from 'axios'
import DeletePost from './DeletePost'

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const {id} = useParams();


  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for user who isn't logged in
  useEffect(() =>{
    if(!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() =>{
    const fetchPost = async () =>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`, { withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
        setPosts(response.data)
      } catch (error) {
        console.log(error);
        
      }
      
    }
    fetchPost();
  }, [])

  



  return (
    <section className='dashboard'>
      {
        posts.length ? <div className='container dashboard_container'>
          {
            posts.map(post => {
              return <article key={post.id} className='dasboard_post'>
                <div className='dashboard_post_info'>
                  <div className='dashboard_post_thumbnail'>
                    <img style={{aspectRatio: '4/3', objectFit: 'cover'}} src={post.thumbnail} alt='' />
                  </div>
                  <h4>{post.title}</h4>
                </div>
                <div className='dashboard_post_action'>
                <Link to={`/posts/${post._id}`} className='btn view'>View</Link>
                <Link to={`/posts/${post._id}/edit`} className='btn edit'>Edit</Link>
                <DeletePost postId={post._id} />
                </div>
              </article>
            })
          }


        </div> : <h2 className='center'>You have no posts yet.</h2>
      }

    </section>

  )
}

export default Dashboard
