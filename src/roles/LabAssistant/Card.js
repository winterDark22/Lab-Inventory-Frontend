import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
function Card(props) {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleClick = async (e, id) => {
    e.stopPropagation();
    navigate(`/labassistant/details/${id}`);
  };

  return (
    // from ALINA

    <div className="xl:col-span-1 h-[450px] overflow-hidden md:col-span-2 bg-myCard border-2 border-gray-300  shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="h-[250px] bg-white overflow-hidden flex items-center justify-center">
        <img
          className="transition hover:scale-105 duration-200 w-96  aspect-auto hover:shadow-lg "
          src={props.equipment.image_link}
          alt=""
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-myText dark:text-white">
          {props.equipment.equipment_name}
        </h5>

        <p className="mb-2 text-sm text-gray-500 text-pretty ">
          {props.equipment.descript}
        </p>

        <p className="text-gray-950 text-base mb-3">
          Available:{" "}
          <span className="text-myText font-bold">
            &nbsp;{props.equipment.available}
          </span>
        </p>

        <Link
          to={`/labassistant/details/${props.equipment.equipment_id}`}
          onClick={(e) => handleClick(e, props.equipment.equipment_id)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:shadow-xl hover:scale-105 active:scale-95 transition duration-100"
        >
          Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>

    // <div className="mt-8 mx-16">
    //   <div className="bg-white rounded-xl justify-center flex-col">
    //     <div className="text-wrap p-3 pt-2">
    //       <div class="float-left">
    //         <img
    //           src="https://cdn.sparkfun.com/assets/learn_tutorials/4/7/12615-02_Full_Size_Breadboard_Split_Power_Rails.jpg"
    //           alt="profile_image"
    //           class="rounded w-32  shadow-sm"
    //         />
    //       </div>
    //       <div className="text-end pt-1">
    //         <p
    //           className="mb-0 text-capitalize text-gray-500  mb-2"
    //           style={{ fontSize: "20px" }}
    //         >
    //           <b>{props.equipment.equipment_name}</b>
    //         </p>
    //         <button
    //           onClick={(e) => handleClick(e, props.equipment.equipment_id)}
    //           className="text-white font-bold text-sm bg-red-700 rounded-lg px-4 ml-32 py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl"
    //         >
    //           Details
    //         </button>
    //       </div>
    //     </div>
    //     <hr class="my-0"></hr>
    //     <div className="p-3">
    //       <p className="mb-0">{props.equipment.descript}</p>
    //     </div>
    //   </div>
    // </div>
  );
}
export default Card;
