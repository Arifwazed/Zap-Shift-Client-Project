import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} =useAuth();

    const location = useLocation();
    // console.log("location from private:",location)

    if(loading){
        return <div>
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children;
    
};

export default PrivateRoute;