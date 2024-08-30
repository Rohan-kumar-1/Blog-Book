import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../Appwrite/auth'
import { logout } from '../../store/Authslice'
import { useNavigate } from 'react-router-dom'



function Logoutbtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logouthandler = () => {
        //mostly apwrite ke andar jitni chij hai wo promise deta hai to  usko handel karne ke liye .then .catch lagan apadega 
        authservice.logout()
            .then(() => {
                dispatch(logout())
                navigate('/login')
            })
        // .catch(() => {
        //     
        // })
    }
    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-lg'
        onClick={logouthandler}>
            Logout
        </button>
    )
}

export default Logoutbtn
