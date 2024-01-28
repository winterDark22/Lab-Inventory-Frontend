import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/student/details");
  }
  return (
    <div className="m-16">
      {/* <h1 className="bg-red-700 font-bold">{props.equipment.equipment_name}</h1>
      <h2>{props.equipment.type}</h2>
      <h3>{props.equipment.available}</h3>
      <button onClick={handleClick}>Request</button> */}
      <div className="bg-white rounded justify-center flex-col">
        <div className="text-wrap p-3 pt-2">
          <div class="float-left">
            <img
              src="https://cdn.sparkfun.com/assets/learn_tutorials/4/7/12615-02_Full_Size_Breadboard_Split_Power_Rails.jpg"
              alt="profile_image"
              class="rounded w-28  shadow-sm"
            />
          </div>
          <div className="text-end pt-1">
            <p className="mb-0 text-capitalize" style={{ fontSize: "20px" }}>
              <b>{props.equipment.equipment_name}</b>
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded hover:shadow-red">
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
