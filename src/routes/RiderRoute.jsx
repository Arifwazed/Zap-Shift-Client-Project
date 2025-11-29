import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { useNavigate } from 'react-router';

const RiderRoute = ({children}) => {
    const {loading} = useAuth();
    const {role,roleLoading} = useRole();
    const navigate = useNavigate()

    if(loading || roleLoading){
        return <div>
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(role !==  'rider'){
        return navigate('/login');
    }
    return children;
};

export default RiderRoute;