import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import Authers from './pages/Authors'
import CreatePost from './pages/CreatePost'
import CategoryPosts from './pages/CategoryPost'
import AutherPosts from './pages/AutherPost'
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost'
import Logout from './pages/Logout'
import Layout from './components/Layout'
import DeletePost from './pages/DeletePost'
import UserProvider from './context/userContext'
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "posts/:id", element: <PostDetail />},
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
      {path: "profile/:id", element: <UserProfile />},
      {path: "authors", element: <Authers />},
      {path: "create", element: <CreatePost />},
      {path: "posts/categories/:category", element: <CategoryPosts />},
      {path: "posts/users/:id", element: <AutherPosts />},
      {path: "myposts/:id", element: <Dashboard />},
      {path: "posts/:id/edit", element: <EditPost />},
      {path: "posts/:id/delete", element: <DeletePost />},
      {path: "logout", element: <Logout />},

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
