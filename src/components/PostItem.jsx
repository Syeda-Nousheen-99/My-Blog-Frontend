import React from 'react'
import { Link } from 'react-router-dom'
import PostAuther from './PostAuther'
import '../index.css'

const PostItem = ({ postID, category, title, desc, autherID, thumbnail, createdAt }) => {
  const shortDescription = desc.length > 120 ? desc.substr(0, 120) + ' ....' : desc;
  const postTitle = title.length > 30 ? title.substr(0, 30) + ' ....' : title;

  // Assuming thumbnail is already the public URL from Firebase Storage
  const thumbnailUrl = thumbnail;

  return (
    <article className='post' style={{background: '#1b1f3b4f', padding: '15px', borderRadius: '20px'}}>
      <div className='post_thumbnail'>
        <Link to={`/posts/${postID}`}>
          <img style={{aspectRatio: '3/2', objectFit: 'cover'}}  src={thumbnailUrl} alt={title} />
        </Link>
      </div>
      <div className='post_content'>
        <Link className='title' to={`/posts/${postID}`}>
          <h3>{postTitle}</h3></Link>
        <p dangerouslySetInnerHTML={{__html: shortDescription}}></p>
        <div className='post_footer'>
          <PostAuther autherID={autherID} createdAt={createdAt} />
          <Link className='category' to={`/posts/categories/${category}`}>{category}</Link>
        </div>
      </div>
    </article>
  )
}

export default PostItem
