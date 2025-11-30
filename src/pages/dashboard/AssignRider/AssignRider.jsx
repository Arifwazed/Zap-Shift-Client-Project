import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const [selectedParcel,setSelectedParcel] = useState(null);

    const {data: parcels = [],refetch: parcelsRefetch} = useQuery({
        queryKey: ['parcels','pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;

        }
    })
    console.log("all parcels: ",parcels)
    console.log("single parcels: ",selectedParcel)
    // for assign rider modal table
    const {data: riders = []} = useQuery({
        enabled: !!selectedParcel,
        queryKey: ['riders',selectedParcel?.senderDistrict,'available'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/riders?status=approve&district=${selectedParcel?.senderDistrict}&workStatus=available`);
            return res.data;
        }
    })
    // for modal
    const openRiderAssignModal = parcel => {
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
    }

    const handleAssignRider = rider => {
        const assignRiderInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        }
        axiosSecure.patch(`/parcel/${selectedParcel._id}`,assignRiderInfo)
        .then(res => {
            if(res.data.modifiedCount){
                riderModalRef.current.close();
                parcelsRefetch();
                Swal.fire({
                    title: "Added!",
                    text: `Rider has been assigned`,
                    icon: "success",
                });
            }
        })
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold">Assign Rider: {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Created At</th>
                        <th>Pickup District</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel,index) => 
                            <tr key={parcel._id}>
                                <th>{index+1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>
                                    <button onClick={()=> {openRiderAssignModal(parcel)}} className='btn btn-primary text-black'>Find Riders</button>
                                </td>
                            </tr>)
                        }
                    
                    </tbody>
                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders Available: {riders.length}</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                riders.map((rider,index) =>
                                    <tr>
                                        <th>{index+1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>
                                            <button onClick={()=> handleAssignRider(rider)} className='btn btn-primary text-black'>Assign</button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRider;