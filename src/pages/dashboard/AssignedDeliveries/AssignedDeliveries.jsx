import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: parcels =  [],refetch} = useQuery({
        queryKey: ['parcels', user.email, 'rider_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider_assigned`)
            return res.data;
        }
    })

    const handleDeliveryConfirm = parcel => {
        const statusInfo = {deliveryStatus: 'rider_arriving'};
        axiosSecure.patch(`/parcels/${parcel._id}/status`,statusInfo)
        .then(res => {
            if(res.data.modifiedCount){
                refetch();
                Swal.fire({
                    title: "Thank you for accepting",
                    // text: ``,
                    icon: "success",
                });
            }
        })
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold">Assigned Deliveries: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Confirm</th>
                        <th>Favorite Color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        parcels.map((parcel,index)=> 
                        <tr>
                            <th>{index+1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {
                                    parcel.deliveryStatus === 'rider_assigned' ? 
                                    <>
                                        <button onClick={()=> handleDeliveryConfirm(parcel)} className='btn btn-primary text-black'>confirm</button>
                                        <button className='btn btn-warning text-black ms-3'>reject</button>
                                    </>
                                    : <span className='bg-primary p-1 rounded-lg'>Accepted</span>

                                }
                                
                            </td>
                            <td>Blue</td>
                        </tr>
                    )
                    }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;