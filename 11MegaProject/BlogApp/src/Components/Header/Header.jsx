import React, { useState } from 'react';
import Container from '../Container';
import Logoutbtn from './Logoutbtn';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../Logo';

function Header() {
    const authstatus = useSelector((state) => state.auth.status);
    const currentUser = useSelector((state) => (state.auth.userdata));
    
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navitems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authstatus },
        { name: 'Signup', slug: '/signup', active: !authstatus },
        // { name: 'All Posts', slug: '/all-posts', active: authstatus },
        { name: 'Your Post', slug: `/user-post/${currentUser?.$id}`, active: authstatus },
        { name: 'Add Post', slug: '/add-post', active: authstatus },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='py-3 shadow bg-blue-400 w-full sticky top-0 z-50 backdrop-blur-md'>
            <Container>
                <nav className='flex justify-between items-center'>
                    <div className='lg:ml-20 md:ml-10 my-auto justify-start'>
                        <Link to='/'>
                            <Logo width='60px' />
                        </Link>
                    </div>
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-white focus:outline-none mr-4 bg-blend-overlay'>
                            <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`hidden md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className='flex ml-auto mr-10'>
                            {navitems.map((navitem) =>
                                navitem.active ? (
                                    <li key={navitem.name}>
                                        <button
                                            onClick={() => navigate(navitem.slug)}
                                            className={`inline-block px-4 py-2 duration-200 rounded-full ${location.pathname === navitem.slug ? 'bg-blue-100 ' : 'hover:bg-blue-100'
                                                }`}>
                                            <div className='text-lg'>{navitem.name}</div>
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authstatus && (
                                <li>
                                    <Logoutbtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className='md:hidden mt-2'>
                        <ul className='flex flex-col items-center'>
                            {navitems.map((navitem) =>
                                navitem.active ? (
                                    <li key={navitem.name} className='w-full text-center'>
                                        <button
                                            onClick={() => {
                                                navigate(navitem.slug);
                                                setIsMenuOpen(false);
                                            }}
                                            className={`block w-full px-4 py-2 duration-200 rounded-full my-2 ${location.pathname === navitem.slug ? 'bg-blue-100' : 'hover:bg-blue-100'
                                                }`}>
                                            <div className='text-lg'>{navitem.name}</div>
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authstatus && (
                                <li className='w-full text-center'>
                                    <Logoutbtn />
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;
