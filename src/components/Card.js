import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductDetail } from "../components/Detail";
function Card(props) {
  const navigate = useNavigate();

  const handleClick = async (e, id) => {
    e.stopPropagation();
    navigate(`/student/details/${id}`);
  };

  return (
    <div className="mt-8 mx-16">
      {/* <h1 className="bg-red-700 font-bold">{props.equipment.equipment_name}</h1>
      <h2>{props.equipment.type}</h2>
      <h3>{props.equipment.available}</h3>
      <button onClick={handleClick}>Request</button> */}
      <div className="bg-white rounded-xl justify-center flex-col">
        <div className="text-wrap p-3 pt-2">
          <div class="float-left">
            <img
              src="https://cdn.sparkfun.com/assets/learn_tutorials/4/7/12615-02_Full_Size_Breadboard_Split_Power_Rails.jpg"
              alt="profile_image"
              class="rounded w-32  shadow-sm"
            />
          </div>
          <div className="text-end pt-1">
            <p
              className="mb-0 text-capitalize text-gray-500  mb-2"
              style={{ fontSize: "20px" }}
            >
              <b>{props.equipment.equipment_name}</b>
            </p>
            <button
              onClick={(e) => handleClick(e, props.equipment.equipment_id)}
              className="text-white font-bold text-sm bg-red-700 rounded-lg px-4 ml-32 py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl"
            >
              Details
            </button>
          </div>
        </div>
        <hr class="my-0"></hr>
        <div className="p-3">
          <p className="mb-0">{props.equipment.descript}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
