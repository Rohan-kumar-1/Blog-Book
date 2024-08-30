import React, { useState, useEffect } from 'react'
import service from '../src/Appwrite/configuration'
import Postcard from '../src/Components/Postcard'
import Container from '../src/Components/Container'

function Allposts() {
    const [posts, setposet] = useState([])
    //yaha pe dhayan rakhna
    useEffect(() => {
        service.getpost([]).then((posts) => {
            if (posts) {
                setposet(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col md:flex-row flex-wrap mx-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/4'> 
                            <Postcard
                                $id={post.$id} 
                                title={post.Title} 
                                imageid={post.imageid}
                                flex={"flex-col"}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts
