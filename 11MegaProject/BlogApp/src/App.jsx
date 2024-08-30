import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authservice from './Appwrite/auth';
import { login, logout } from './store/Authslice';
import { Footer, Header } from './Components';
import { Outlet } from 'react-router-dom';



function App() {
  //console.log(process.enc.REACT_APP_APPWRITE_URL);    //now it should be visible in console log but process tab kaam karta hai jab react se banaya gaya ho but hamara vite hai

  //yaha v access karne ka tarika alag hoga
  // console.log(import.meta.env.VITE_APP_APPWRITE_URL);

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userdata = await authservice.getcurrentuser();
        if (userdata) {
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
          console.log("No user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        dispatch(logout());
      } finally {
        setloading(false);
      }
    };

    checkUser();
  }, [dispatch]);


  //ab agar loading ho raha to loading show hoga nahi to fir normal return hoga
  return loading ? (
    <div className="flex flex-col justify-center bg-blue-100 items-center min-h-screen raus">
      <div className='w-8 h-8 rounded-full border-t-4 border-blue-700 animate-spin'></div>
      {/* <br />
      <h1 className="font-serif text-2xl">Loading...</h1> */}

    </div>
  ) : (
    <div className='w-full bg-slate-100'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
