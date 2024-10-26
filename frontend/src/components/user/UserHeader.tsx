import React, { useEffect, useState } from 'react';
import back from '../../assets/user/back.png'; 
import { Link } from 'react-router-dom';
import NavbarComponent from './navbarComponent';
const UserHeader = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);  
    }, []);

    return (
        <header className='w-full h-32 bg-purple-950 text-white flex justify-between items-center px-8'>
            <div className="flex items-center">
                <img src={back} alt="Logo" className="h-20 w-auto" /> 
            </div>
       <NavbarComponent/>
       
       
        </header>
    );
};

export default UserHeader;
