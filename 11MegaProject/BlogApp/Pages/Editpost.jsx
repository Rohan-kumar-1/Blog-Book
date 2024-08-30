import React, { useEffect, useState } from 'react'
import Container from '../src/Components/Container'
import PostForm from '../src/Components/postForm/PostForm'
import service from '../src/Appwrite/configuration'
import { useNavigate, useParams } from 'react-router-dom'

function Editpost() {
  const [post, setposts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (slug) {
      service.getpost(slug).then((post) => {
        setposts(post)
      })
    }
    else {
      navigate('/')
    }
  }, [slug, navigate])

  return post ? (
    <div className='py-8 '>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default Editpost
