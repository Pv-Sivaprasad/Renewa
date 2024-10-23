import React, { useState, ChangeEvent, FormEvent } from 'react'
import UserHeader from '../../components/user/UserHeader'
import UserFooter from '../../components/user/UserFooter'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import reg from '../../assets/user/registration-bg.jpeg'


interface UserFormData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const UserRegistration: React.FC = () => {

    const dispatch = useDispatch()

    
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

    return (
        <div>
            <UserHeader />
            <div className="flex h-screen bg-blue-700">
                <div className="w-1/2 flex items-center justify-center">
                    <img src={reg} alt="Registration" className="w-auto h-auto" />
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center p-10">
                    <h1 className="text-3xl font-bold mb-6">Registration</h1>
                    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete='name'
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete='email'
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete='new-password'
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete='new-password'
                            />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-2xl hover:bg-purple-700">
                            Sign Up
                        </button>
                        <br />
                        <div className="log flex items-center justify-center mt-4">
                            <p className='text-black mr-2'>Already a member ? Sign in now ....</p>
                            <Link to='/login'>
                                <span className='text-white underline'>Sign In</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <UserFooter />
        </div>
    )
}

export default UserRegistration



