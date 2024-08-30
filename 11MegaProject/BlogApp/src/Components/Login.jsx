import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authlogin } from '../store/Authslice';
import Button from './Header/Button';
import Input from './Header/Input';
import Logo from './Logo';
import { useDispatch } from 'react-redux';
import authservice from '../Appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [ loading, Setloading ] = useState(false);
    const [error, setError] = useState("");

    const login = async (data) => {
        if(data){
            setError("");
            Setloading(true)
        try {
            const session = await authservice.login(data);
            if (session) {
                const userdata = await authservice.getcurrentuser();
                if (userdata) {
                    dispatch(authlogin(userdata));
                }
                Setloading(false);
                navigate("/");
            }
        } catch (err) {
            // Handle cases where err might not be a string
            Setloading(false)
            setError(err.message || "An error occurred. Please try again.");
        }
        }
    };

    return loading? (<div className="flex flex-col justify-center bg-blue-100 items-center min-h-screen raus">
        <div className='w-8 h-8 rounded-full border-t-4 border-blue-700 animate-spin'></div>
        {/* <br />
        <h1 className="font-serif text-2xl">Loading...</h1> */}
  
      </div>) : (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign in to Your Account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                maxLength: {
                                    value: 50,
                                    message: "Email must be less than 50 characters"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <Button
                            type="submit"
                            className='w-full'
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
