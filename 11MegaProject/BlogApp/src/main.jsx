import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider, useSelector } from 'react-redux'
import store from './store/Store.js'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authlayout from './Components/Authlayout.jsx'
import Addpost from '../Pages/Addpost.jsx'
import Allposts from '../Pages/Allposts.jsx'
import Editpost from '../Pages/Editpost.jsx'
import Home from '../Pages/Home.jsx'
import Loginpage from '../Pages/Loginpage.jsx'
import Post from '../Pages/Post.jsx'
import Signuppage from '../Pages/Signuppage.jsx'
import Userpost from '../Pages/Userpost.jsx' 




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          //here we are checking that we need authentication or not while login
          //so we are login so we dont need authentication but when we get loged in then we need that
          <Authlayout authentication={false}>
            <Loginpage/>
          </Authlayout>
        )
      },
      {
        path: '/signup',
        element: (
          <Authlayout authentication={false}>
            <Signuppage/>
          </Authlayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <Authlayout authentication={true}>
            <Allposts />
          </Authlayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <Authlayout authentication={true}>
            <Addpost />
          </Authlayout>
        )
      },
      {
        path: '/user-post/:userid',
        element: (<Authlayout authentication={true}>
          <Userpost />
          </Authlayout>)
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Authlayout authentication={true}>
            <Editpost/>
          </Authlayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
)
