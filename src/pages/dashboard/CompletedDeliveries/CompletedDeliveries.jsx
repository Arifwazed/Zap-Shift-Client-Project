import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: parcels =  [],refetch} = useQuery({
        queryKey: ['parcels', user.email, 'parcel_delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/riderCompleted?riderEmail=${user.email}&deliveryStatus=parcel_delivered`)
            return res.data;
        }
    })

    const calculatePayout = parcel => {
        let cost = 0;
        if(parcel.senderDistrict === parcel.receiverDistrict){
            cost = parcel.cost * 0.6;
        }
        else{
            cost = parcel.cost * 0.8;
        }
        return cost;
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold">Completed Deliveries: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Pickup District</th>
                        <th>Cost</th>
                        <th>Payout</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel,index) => 
                            <tr key={parcel._id}>
                                <th>{index+1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>{parcel.cost}</td>
                                <td>{calculatePayout(parcel)}</td>
                                <td>
                                    <button className='btn btn-primary text-black'>Cash Out</button>
                                </td>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;