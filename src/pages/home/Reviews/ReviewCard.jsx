import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const {userName,review: reviewtext,user_photoURL} = review;
    return (
        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-3 md:p-6">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-teal-200 text-4xl mb-3" />

            {/* Text */}
            <p className="text-gray-600 mb-6">
                {reviewtext}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-teal-300 my-4"></div>

            {/* Profile */}
            <div className="flex items-center gap-4">
                {/* Circle avatar */}
                <div className="md:w-15 md:h-15 rounded-full bg-teal-800"><img src={user_photoURL} className='rounded-full' alt="" /></div>

                <div>
                <h3 className="font-bold text-teal-900">{userName}</h3>
                <p className="text-gray-500 text-sm">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;