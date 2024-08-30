import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import service from '../src/Appwrite/configuration';
import Postcard from '../src/Components/Postcard';
import Container from '../src/Components/Container';
import { useSelector } from 'react-redux';

function Userpost() {
  const { userid } = useParams(); // Get user ID from URL
  const [posts, setPosts] = useState([]);
  const currentuser = useSelector(state => state.auth.userdata);

   useEffect( () =>  {
     service.getpost([]).then((response) => {
      if (response) {
        let userPosts = response.documents.filter(post => post.userid === userid);
        if (currentuser.$id != userid) {
          userPosts = userPosts.filter(post => post.status === 'active');
        }
        setPosts(userPosts);
      }
    });
  }, [userid, currentuser]);

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-col md:flex-row flex-wrap mx-6'>
          {posts.map((post) => (
            (
              <div key={post.$id} className={`p-2 w-full md:w-1/2 lg:w-1/4 rounded-lg `}>
                {post.status !== 'active' ?
                  <Postcard
                    $id={post.$id}
                    title={post.Title}
                    imageid={post.imageid}
                    flex='flex-col'
                    bgcolor='bg-red-100'
                  /> : 
                  <Postcard
                    $id={post.$id}
                    title={post.Title}
                    imageid={post.imageid}
                    flex='flex-col'
                  />}

              </div>
            )
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Userpost;
