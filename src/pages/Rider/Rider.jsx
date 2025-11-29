import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import formImg from "../../assets/agent-pending.png";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const duplicateRegions = serviceCenters.map((service) => service.region);
  const regions = [...new Set(duplicateRegions)];
  // console.log(regions);
  const senderRegion = useWatch({ control, name: "region" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((r) => r.district);
    // console.log(districts)
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log("From rider: ",data);
    axiosSecure.post('/riders',data)
    .then(res => {
        if(res.data.insertedId){
            Swal.fire({
              title: "Added!",
              text: "Your application has been submitted. we will reach you within 10days",
              icon: "success",
            });
            navigate("/dashboard/my-parcels");
        }
    })
    // const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    // const isDocument = data.parcelType === "document";
    // const weight = parseFloat(data.parcelWeight);
    // // console.log(isDocument)
    // let cost = 0;
    // if (isDocument) {
    //   cost = isSameDistrict ? 60 : 80;
    // } else {
    //   if (weight <= 3) {
    //     cost = isSameDistrict ? 110 : 150;
    //   } else {
    //     const minCharge = isSameDistrict ? 110 : 150;
    //     const extraWeight = weight - 3;
    //     const extraCost = isSameDistrict
    //       ? extraWeight * 40
    //       : extraWeight * 40 + 40;
    //     cost = minCharge + extraCost;
    //   }
    // }
    // console.log(cost);
    // data.cost = cost;

    // Swal.fire({
    //   title: "Agree with the cost?",
    //   text: `You will be charged taka`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, I agree!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     axiosSecure.post("/parcels", data).then((res) => {
    //       console.log("after saving parcel:", res.data);
    //       if (res.data.insertedId) {
    //         Swal.fire({
    //           title: "Added!",
    //           text: "Your parcel has been added.",
    //           icon: "success",
    //         });
    //         navigate("/dashboard/my-parcels");
    //       }
    //     });
    //   }
    // });
  };

  return (
    <div className="bg-white rounded-xl my-10 py-10 px-5 md:px-15">
      <h1 className="text-4xl font-bold">Be A Rider</h1>
      <p className="my-2 md:w-1/2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-5">
          <div className="">
            <h1 className="text-xl font-semibold mt-8 mb-3">
              Tell us about yourself
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mb-5">
              {/* sender info */}
              <fieldset className="fieldset">
                {/* sender name */}
                <label className="label text-black">Your Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input w-full"
                  placeholder="Your Name"
                  defaultValue={user?.displayName}
                />
                {/* sender email */}
                <label className="label text-black">Your Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input w-full"
                  placeholder="Your Email"
                  defaultValue={user?.email}
                />

                {/* Sender Phone No */}
                <label className="label text-black">Your Phone No</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="input w-full"
                  placeholder="Your Phone No"
                />

                {/* Sender Age */}
                <label className="label text-black">Your Age</label>
                <input
                  type="text"
                  {...register("age")}
                  className="input w-full"
                  placeholder="Your Age"
                />
              </fieldset>
              {/* receiver info */}
              <fieldset className="fieldset">
                {/* NID */}
                <label className="label text-black">Your NID</label>
                <input
                  type="text"
                  {...register("nid")}
                  className="input w-full"
                  placeholder="Your NID"
                />

                {/* region */}
                <fieldset className="fieldset">
                  <legend className="label text-black">Your Region</legend>
                  <select
                    {...register("region")}
                    defaultValue="Pick a region"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a region</option>
                    {regions.map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* districts */}
                <fieldset className="fieldset">
                  <legend className="label text-black">Your District</legend>
                  <select
                    {...register("district")}
                    defaultValue="Pick a district"
                    className="select w-full"
                  >
                    <option disabled={true}>Pick a district</option>
                    {districtsByRegion(senderRegion).map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* address */}
                <label className="label text-black -mt-1">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="input w-full"
                  placeholder="Address"
                />
              </fieldset>
            </div>
            <input
              type="submit"
              value="Proceed to Confirm Booking"
              className="btn btn-primary text-black w-full"
            />
          </div>
          <img src={formImg} alt="" className="mx-auto"/>
        </div>
      </form>
    </div>
  );
};

export default Rider;
