import React from 'react'
import UserHeader from '../../components/user/UserHeader'
import UserFooter from '../../components/user/UserFooter'
import { Link } from 'react-router-dom'
import reg from '../../assets/user/registration-bg.jpeg'



const UserRegistration = () => {
  
  
  
    return (
    <div>

        <UserHeader/>


        <div className="flex h-screen bg-blue-700">
                {/* Left div for the image */}
                <div className=" w-1/2 flex items-center justify-center">
                    <img src={reg} alt="Login" className="w-auto h-auto" /> {/* Adjust size as needed */}
                </div>

                {/* Right div for the login form */}
                <div className="w-1/2 flex flex-col items-center justify-center p-10">
                    <h1 className="text-3xl font-bold mb-6">Registeration</h1>
                    <form className="w-full max-w-sm">
                    <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-2xl hover:bg-purple-700 transition duration-200">Sign In</button>
                        <br />
                        <div className="log flex items-center justify-center mt-4">
                            <p className='text-black mr-2'>New here? Register now ....</p>
                            <Link to='/login'>
                                <span className='text-white underline'>Sign Up</span>
                            </Link>
                        </div>



                    </form>
                    
                   
                </div>
            </div>

        <UserFooter/>


    </div>
  )
}

export default UserRegistration
