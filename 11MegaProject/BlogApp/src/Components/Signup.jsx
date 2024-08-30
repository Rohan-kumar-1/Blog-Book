import React, { useState } from 'react'
import authservice from '../Appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Header/Button'
import Input from './Header/Input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/Authslice' // Ensure correct import for login action

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, Setloading] = useState(false);

    const create = async (data) => {
        Setloading(true)
        setError("")
        try {
            const newuserdata = await authservice.createaccount(data.email, data.password, data.name)
            if (newuserdata) {
                const session = await authservice.login(data);
                if (session) {
                    const userdata = await authservice.getcurrentuser();
                    if (userdata) {
                        dispatch(login(userdata));

                    }
                    Setloading(false)
                    navigate("/");
                }
            }
        } catch (error) {
            Setloading(false)
            setError(error.message)
        }
    }

    return loading? (<div className="flex flex-col justify-center bg-blue-100 items-center min-h-screen raus">
        <div className='w-8 h-8 rounded-full border-t-4 border-blue-700 animate-spin'></div>
        {/* <br />
        <h1 className="font-serif text-2xl">Loading...</h1> */}
  
      </div>) :(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* on submit pe handelsubmit pe gaye waha se creat method ko cll kiya ab yaha se data milega jo ki register ke through handel hoga */}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                maxLength: 50,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value) || "Invalid email address",
                                }
                            })}
                        />
                        {/* ye sab value waha overwrite ho jayegi and jo waha nahi hao wo props me chala jayega spread ho ke an dregister me spread hi kar ke vejna parta hai

                            email ke baad ek object aata hai to uske liye react-hook-form ka documentation padhna padega */}

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className='w-full'
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
