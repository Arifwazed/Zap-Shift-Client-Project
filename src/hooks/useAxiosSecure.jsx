import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://zap-shift-server-rosy.vercel.app'
})

const useAxiosSecure = () => {

    const {user,logOut} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        // request
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {

            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
        // response
        const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
            return response;
        },(error)=>{
            console.log('from axiosSecure: ',error)
            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 403){
                logOut()
                .then(()=>{
                    navigate('/login')
                })

            }
            return Promise.reject(error)
        })
        // out the inceptor when user out from the page
        return () =>{
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.request.eject(resInterceptor)
        }
    },[user,logOut,navigate])

    return axiosSecure;
};

export default useAxiosSecure;