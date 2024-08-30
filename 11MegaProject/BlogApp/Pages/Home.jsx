import React, { useEffect, useState } from 'react';
import service from '../src/Appwrite/configuration';
import Postcard from '../src/Components/Postcard';
import { useNavigate } from 'react-router-dom';
import logoimage from '../src/assets/logoimage.png';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../src/store/Authslice';
import parse from 'html-react-parser';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const users = useSelector((state) => (state.auth.users));
    const loginstatus = useSelector((state) => (state.auth.status))
    
        
        if(loginstatus){
            useEffect(() => {
                service.getactivepost([]).then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
        
                        // Create the map of user using userid as id hence duplicate id will not get stored
                        const usermap = new Map();
                        posts.documents.forEach(post => {
                            usermap.set(post.userid, post.name);
                        });
        
                        // Creation of map to keep it in store
                        const userArray = Array.from(usermap, ([key, value]) => ({ key, value }));                        
                        dispatch(setUsers(userArray));
                    }
                });
            }, [dispatch]);
        }
    
    const handleClick = (userid) => {
        navigate(`/user-post/${userid}`);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    if (posts.length === 0) {
        if(!loginstatus){
            return (
                <div className='flex flex-col'>
                    <h1 className='text-blue-950 font-serif text-6xl mx-auto mt-10 hover:underline'>
                        Blog Book
                    </h1>
                    <div className='w-full flex items-center justify-center text-center p-4'>
                        <div className='w-full flex flex-wrap items-center'>
                            <div className='md:items-start md:w-1/2 mx-auto'>
                                <div className='relative w-full max-w-md mx-auto hover:animate-pulse'>
                                    <img
                                        src={logoimage}
                                        alt='Blog Book'
                                        className='w-full h-auto max-w-full max-h-[500px] object-cover rounded-xl'
                                        style={{ minHeight: '500px' }} // Minimum height for the image
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col items-center md:items-start md:w-1/2 mt-10 md:mt-0 mx-auto'>
                                <h1 className='text-4xl font-bold text-blue-500 lg:mb-4 ml-4'>
                                    Login to read Posts
                                </h1>
                                <div className='ml-3'>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='inline-block px-6 py-2 m-2 bg-blue-500 text-white rounded-full duration-200 hover:bg-blue-700'>
                                        Sign in
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className='inline-block px-6 py-2 m-2 bg-green-500 text-white rounded-full duration-200 hover:bg-green-700'>
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
    } else {
        return (
            <div className='flex flex-wrap py-8 overflow-hidden'>
                <div className='w-full sm:hidden mb-4'>
                    <button
                        className='bg-blue-500 text-white text-xl bold font-serif p-2 rounded hover:underline hover:bg-blue-700 w-full'
                        onClick={toggleDropdown}
                    >
                        Select User
                    </button>
                    {isDropdownOpen && (
                        <div className='bg-slate-100 shadow-md rounded-xl mt-2 mx-2 '>
                            {users.map((user) => (
                                <button
                                    key={user.key}
                                    className='w-full border font-bold py-2 text-blue-500 hover:bg-blue-100 hover:underline mx-auto'
                                    onClick={() => {
                                        handleClick(user.key);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {user.value}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className='flex flex-col sm:w-3/4 h-screen overflow-y-auto p-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full max-h-dvh'>
                            <div className='flex items-center'>
                                <h2 className='text-2xl mb-1 mx-auto font-semibold font-serif underline text-violet-950'>
                                    Author: {post.name}
                                </h2>
                            </div>
                            <Postcard
                                $id={post.$id}
                                title={post.Title}
                                imageid={post.imageid}
                                content={parse(post.content)}
                            />
                        </div>
                    ))}
                </div>
                <div className='hidden sm:flex sm:flex-col sm:w-1/4 p-4 h-screen sticky top-0 mt-9'>
                    {users.map((user) => (
                        <button
                            key={user.key} // Ensure 'key' is unique
                            className='bg-blue-500 text-white text-xl bold font-serif p-2 mb-2 rounded hover:underline hover:bg-blue-700'
                            onClick={() => handleClick(user.key)}
                        >
                            {user.value}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
