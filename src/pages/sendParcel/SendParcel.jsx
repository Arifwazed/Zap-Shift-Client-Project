import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
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
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((r) => r.district);
    // console.log(districts)
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";
    const weight = parseFloat(data.parcelWeight);
    // console.log(isDocument)
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = weight - 3;
        const extraCost = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCost;
      }
    }
    console.log(cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel:", res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Your parcel has been added",
              text: "Added!",
              icon: "success",
            });
            navigate('/dashboard/my-parcels')
          }
        });
      }
    });
  };
  return (
    <div className="bg-white rounded-xl my-10 py-10 px-10 md:px-15">
      <h1 className="text-4xl font-bold">Send A Parcel</h1>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* parcel type */}
        <div className="mt-5">
          <label className="label text-black mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio radio-primary"
              defaultChecked
            />
            Document
          </label>
          <label className="label text-black">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio radio-primary"
            />
            Non-Document
          </label>
        </div>
        {/* parcel name and weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mb-5">
          {/* name */}
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          {/* weight */}
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight (KG)"
            />
          </fieldset>
        </div>
        <hr className="border border-gray-200 mb-5" />
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-5">
          {/* sender info */}
          <fieldset className="fieldset">
            <h1 className="text-lg font-semibold">Sender Details</h1>
            {/* sender name */}
            <label className="label text-black">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              placeholder="Sender Name"
              defaultValue={user?.displayName}
            />
            {/* sender email */}
            <label className="label text-black">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full"
              placeholder="Sender Email"
              defaultValue={user?.email}
            />

            {/* Sender Phone No */}
            <label className="label text-black">Sender Phone No</label>
            <input
              type="text"
              {...register("senderPhone")}
              className="input w-full"
              placeholder="Sender Phone No"
            />
            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Region</legend>
              <select
                {...register("senderRegion")}
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
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
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
            {/* /* Your District */
            /* <label className="label text-black">Your District</label>
                        <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="Your District" /> */}
            {/* address */}
            <label className="label text-black">Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Address"
            />
            {/* Pickup Instruction  } */}
            <label className="label text-black">Pickup Instruction</label>
            {/* <input type="area" {...register('pickupInstruction')} className="input w-full" placeholder="Pickup Instruction" /> */}
            <textarea
              {...register("pickupInstruction")}
              className="textarea w-full"
              placeholder="Pickup Instruction"
            ></textarea>
          </fieldset>
          {/* receiver info */}
          <fieldset className="fieldset">
            <h1 className="text-lg font-semibold">Receiver Details</h1>
            {/* sender name */}
            <label className="label text-black">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Receiver Name"
            />

            {/* Sender Phone No */}
            <label className="label text-black">Receiver Phone No</label>
            <input
              type="text"
              {...register("receiverPhone")}
              className="input w-full"
              placeholder="Receiver Phone No"
            />

            {/* region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region</legend>
              <select
                {...register("receiverRegion")}
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
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(receiverRegion).map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Your District */}
            {/* <label className="label text-black">Receiver District</label>
                        <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="Receiver District" /> */}
            {/* address */}
            <label className="label text-black">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Receiver Address"
            />
            {/* Pickup Instruction */}
            <label className="label text-black">Delivery Instruction</label>
            {/* <input type="area" {...register('pickupInstruction')} className="input w-full" placeholder="Pickup Instruction" /> */}
            <textarea
              {...register("deliveryInstruction")}
              className="textarea w-full"
              placeholder="Delivery Instruction"
            ></textarea>
          </fieldset>
        </div>
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
