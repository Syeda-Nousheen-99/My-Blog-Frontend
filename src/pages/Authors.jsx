import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultAvatar from '../images/user.png'
import Loader from '../components/Loader'


const Authors = () => {
  const [author, setAuther] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() =>{
    const getAuther = async () =>{
      setIsLoading(true);
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, { withCredentials: true });
        setAuther(response.data)
      } catch(error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getAuther();
  }, [])

  if(isLoading) {
    return <Loader />
  }
  return (
    <section className='authors'>
      {author.length > 0 ?  <div className='container auther_container'>
        {
        author.map(({_id: id, avatar, name, posts}) =>{
            return <Link className='auth' key={id} to={`/posts/users/${id}`}>
              <div className='auther_avatar'>
                <img src={avatar || defaultAvatar} alt={`Image of${name}`}/>
              </div>
              <h4>{name}</h4>
              <p>{posts}</p>
            </Link>
        })
        }
      </div>: <h2 className='center'>No users/authers found.</h2>}
    </section>
  )
}

export default Authors
