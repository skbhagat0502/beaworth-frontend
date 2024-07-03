import Rating from "@mui/material/Rating";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="w-[max-content] bg-white shadow-md shadow-slate-400 p-4 flex flex-col justify-start items-start rounded-md gap-2">
      <div className="flex gap-2 justify-start items-center">
        <img src={profilePng} alt="User" className="w-[50px] h-[50px]" />
        <p>{review.name}</p>
      </div>
      <div className="flex justify-start items-start flex-col">
        <Rating {...options} />
        <span className="px-[4px]">{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
