import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParam] = useSearchParams();
    const sessionId = searchParam.get('session_id');
    const [paymentInfo,setPaymentInfo] = useState({});
    console.log("session_id: ",sessionId)
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data)
                setPaymentInfo({
                    transactionId : res.data.transactionId,
                    trackingId : res.data.trackingId
                })
            })
        }
    },[sessionId,axiosSecure])
    return (
        <div>
            <h1 className='text-3xl font-bold text-green-400'>Payment is Successfull</h1>
            <div className='bg-gray-200 py-5'>
                <h2>Transaction ID: <span className='text-blue-500 font-semibold'>{paymentInfo.transactionId}</span></h2>
                <h2>Tracking ID: <span className='text-blue-500 font-semibold'>{paymentInfo.trackingId}</span></h2>
            </div>
        </div>
    );
};

export default PaymentSuccess;