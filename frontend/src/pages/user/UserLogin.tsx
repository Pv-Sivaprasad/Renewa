import React, { useState } from 'react';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import login from '../../assets/user/login.jpg'
import google from '../../assets/user/googleLogo.jpeg'
import { Link } from 'react-router-dom';




const UserLogin = () => {



    return (
        <div>
            <UserHeader />

            <div className="flex h-screen bg-blue-700">
                {/* Left div for the image */}
                <div className=" w-1/2 flex items-center justify-center">
                    <img src={login} alt="Login" className="w-auto h-auto" /> {/* Adjust size as needed */}
                </div>

                {/* Right div for the login form */}
                <div className="w-1/2 flex flex-col items-center justify-center p-10">
                    <h1 className="text-3xl font-bold mb-6">Login</h1>
                    <form className="w-full max-w-sm">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition duration-200">Sign In</button>
                        <br />
                        <div className="log flex items-center justify-center mt-4">
                            <p className='text-black mr-2'>New here? Register now ....</p>
                            <Link to='/register'>
                                <span className='text-white underline'>Sign Up</span>
                            </Link>
                        </div>



                    </form>
                    <br />
                    <button className="flex items-center justify-center w-full text-white border-gray-300 p-2 rounded-md
            transition duration-200">
                        <img src={google} alt="Google" className="w-5 h-5 mr-2" /> {/* Replace with Google icon */}
                        Sign In with Google
                    </button>
                </div>
            </div>

            <UserFooter />
        </div>
    );
};

export default UserLogin;
