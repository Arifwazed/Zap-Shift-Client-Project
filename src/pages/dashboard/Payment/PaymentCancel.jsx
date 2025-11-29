import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
             <h1 className='text-3xl font-bold text-red-500'>Payment is Cancelled.Please try again!!</h1>
             <Link to="/dashboard/my-parcels"><button className='btn btn-primary text-black my-3'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancel;