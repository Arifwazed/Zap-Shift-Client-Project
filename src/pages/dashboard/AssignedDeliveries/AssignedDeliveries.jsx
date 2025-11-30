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

    const handleDeliveryUpdateStatus = (parcel,status) => {
        // console.log('parcel and status',parcel,status)
        const statusInfo = {
            deliveryStatus: status, 
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        };
        let message = `Parcel status is updated to ${status.split('_').join(' ')}`;
        axiosSecure.patch(`/parcels/${parcel._id}/status`,statusInfo)
        .then(res => {
            // console.log('success update:',res.data)
            if(res.data.modifiedCount){
                refetch();
                Swal.fire({
                    title: message,
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
                        <th>Other Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        parcels.map((parcel,index)=> 
                        <tr key={parcel._id}>
                            <th>{index+1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {
                                    parcel.deliveryStatus === 'rider_assigned' ? 
                                    <>
                                        <button onClick={()=> handleDeliveryUpdateStatus(parcel,'rider_arriving')} className='btn btn-primary text-black'>confirm</button>
                                        <button className='btn btn-warning text-black ms-3'>reject</button>
                                    </>
                                    : <span className='bg-primary p-1 rounded-lg'>Accepted</span>

                                }
                                
                            </td>
                            <td>
                                {
                                    parcel.deliveryStatus !== 'parcel_pickedUp' ? <button onClick={()=> handleDeliveryUpdateStatus(parcel,'parcel_picked_up')} className='btn btn-warning  text-black'>Mark as Picked Up</button> : <span className='bg-warning p-1 rounded-lg'>picked up</span>
                                }
                                
                                <button onClick={()=> handleDeliveryUpdateStatus(parcel,'parcel_delivered')} className='btn btn-primary text-black ms-3'>Mark as Delivered</button>
                            </td>
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