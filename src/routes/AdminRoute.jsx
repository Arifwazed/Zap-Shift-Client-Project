import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Login from '../pages/auth/Login/Login';
import { useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
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

    if(role !==  'admin'){
        return navigate('/login');
    }
    return children;
};

export default AdminRoute;