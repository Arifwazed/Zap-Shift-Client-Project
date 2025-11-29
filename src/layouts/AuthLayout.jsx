import React from 'react';
import Logo from '../component/Logo/Logo';
import authImg from '../assets/authImage.png'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-[#EAECED]'>
        <div className='max-w-[1600px] mx-auto border'>
            <Logo></Logo>
            <div className="min-h-[80vh] md:min-h-[70vh] w-full flex items-center">
            <div className='w-full flex flex-col md:flex-row items-center border'>
                <div className='flex-1  border'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1 border bg-[#FAFDF0]'>
                    <img src={authImg} alt="" />
                </div>
            </div></div>
        </div></div>
    );
};

export default AuthLayout;