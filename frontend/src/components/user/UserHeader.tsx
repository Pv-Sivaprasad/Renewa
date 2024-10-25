import React, { useEffect, useState } from 'react';
import back from '../../assets/user/back.png'; 
import { Link } from 'react-router-dom';

const UserHeader = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);  // If accessToken exists, set isAuthenticated to true
    }, []);

    return (
        <header className='w-full h-30 bg-purple-950 text-white flex justify-between items-center px-8'>
            <div className="flex items-center">
                <img src={back} alt="Logo" className="h-20 w-auto" /> 
            </div>

            <nav>
                <ul className='flex space-x-6'>
                    <Link to='/'>
                        <li>
                            <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Home</button>
                        </li>
                    </Link>
                    <li>
                        <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>About</button>
                    </li>
                    <li>
                        <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Contact</button>
                    </li>
                    <li>
                        <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Specialities</button>
                    </li>

                    {/* Conditional rendering for Login or Profile */}
                    {isAuthenticated ? (
                        <Link to='/dashboard'>
                            <li>
                                <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Profile</button>
                            </li>
                        </Link>
                    ) : (
                        <Link to='/login'>
                            <li>
                                <button className='hover:bg-blue-600 px-4 py-2 rounded cursor-pointer'>Login</button>
                            </li>
                        </Link>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default UserHeader;
