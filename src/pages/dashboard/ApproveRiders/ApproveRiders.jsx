import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiUserAddFill } from "react-icons/ri";
import { HiUserRemove } from "react-icons/hi";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status,email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: "Added!",
          text: `Rider status is set to ${status}`,
          icon: "success",
        });
      }
    });
  };
  const handleApproval = (rider) => {
    updateRiderStatus(rider,"approve")
  };

  const handleRejection = rider => {
    updateRiderStatus(rider,'reject')
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">
        Riders Pending Approval: {riders.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td className={`${rider.status === 'pending' ? 'text-yellow-600' : `${rider.status === 'approve' ? 'text-green-600' : 'text-red-500'}`}`}>{rider.status}</td>
                <td>{rider.workStatus}</td>
                <td>
                  <button
                    onClick={() => { handleApproval(rider)}} className="btn bg-primary">
                    <RiUserAddFill />
                  </button>
                  <button onClick={()=> {handleRejection(rider)}} className="btn bg-yellow-400 mx-2">
                    <HiUserRemove />
                  </button>
                  <button className="btn bg-rose-500">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
