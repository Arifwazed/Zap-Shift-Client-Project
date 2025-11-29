import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiShieldOff } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText,setSearchText]  = useState('');

    const {refetch,data: users = []} = useQuery({
        queryKey: ['users',searchText],
        queryFn: async() => {
            const res =await axiosSecure.get(`/users?searchText=${searchText}`)
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = {role: 'admin'};
        axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
        .then(res => {
            if(res.data.modifiedCount){
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, make admin!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                        title: "Modified!",
                        text: `${user.displayName} marked as an Admin`,
                        icon: "success"
                        });
                    }
                    refetch()
                });
            }
        })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = {role: 'user'};
        axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
        .then(res => {
            if(res.data.modifiedCount){
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, remove admin!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                        title: "Removed!",
                        text: `${user.displayName} removed from Admin`,
                        icon: "success"
                        });
                    }
                    refetch()
                });
            }
        })
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold mb-5">Manage User: {users.length}</h1>
            {/* search */}
            <p className='my-2'>search input: {searchText}</p>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
                
            </label>
            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Admin Action</th>
                        <th>Other Action</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user,index)=> 
                        <tr>
                        <th>{index+1}</th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                src={user.photoURL}
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{user.displayName}</div>
                            </div>
                        </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            {
                                user.role === 'admin' ? <button onClick={()=>handleRemoveAdmin(user)} className='btn bg-red-400'><FiShieldOff /></button > : <button onClick={()=>handleMakeAdmin(user)} className='btn bg-green-400'><FaUserShield /></button>
                            }
                        </td>
                        <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                        </tr>)
                    }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;