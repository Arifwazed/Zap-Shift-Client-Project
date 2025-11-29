import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">
        Payment History: {payments.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid Time</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment,index) => <tr key={payment._id}>
                    <th>{index+1}</th>
                    <td>{payment.parcelName}</td>
                    <td>BDT-{payment.amount}</td>
                    <td>{payment.paidAt}</td>
                    <td>{payment.transactionId}</td>
                    </tr>
                )
            }
            {/* row 1 */}
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
