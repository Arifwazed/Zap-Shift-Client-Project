import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {data: parcel = [],isLoading} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn : async () => {
            const res = await axiosSecure.get(`/parcel/${parcelId}`)
            return res.data;
        }
    })
    if(isLoading){
        return <div>
            <span className="loading loading-infinity loading-xs"></span>
            <span className="loading loading-infinity loading-sm"></span>
            <span className="loading loading-infinity loading-md"></span>
            <span className="loading loading-infinity loading-lg"></span>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    const handlePayment = async() => {
        const paymentInfo = {
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            cost: parcel.cost,
            senderEmail: parcel.senderEmail
        }

        const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url;
    }

    return (
        <div>
            <h1>Please payment <span className='font-bold'>BDT-{parcel.cost}</span> for: {parcel.parcelName}</h1>
            <button onClick={handlePayment} className='btn btn-primary text-black'>PaY</button>
        </div>
    );
};

export default Payment;