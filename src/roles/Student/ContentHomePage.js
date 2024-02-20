import { useEffect, useState } from "react";

import { useEquipmentsContext } from "../../context/EquipmentsContext";
import { ACTION } from "../../context/EquipmentsContext";
import { useAuthContext } from "../../context/AuthContext";
import Card from "../../components/Card";

export function ContentHomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { equipments, dispatch } = useEquipmentsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("/api/equipments/");

        const json = await response.json();

        console.log(json);

        if (response.ok) {
          dispatch({ type: ACTION.SET_EQUIPMENT, payload: json });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, [user.username, dispatch]);

  return (
    <div className=" my-2 min-h-screen">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          On Our Website
        </h2>
        <div className="flex ">
          <input
            type="text"
            placeholder="Type here"
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 m-5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-4 justify-between w-full p-5 border text-left md:gap-4 lg:gap-5 xl:gap-7">
        {equipments &&
          equipments
            .filter((equipment) =>
              equipment.equipment_name
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase())
            )
            .map((equipment) => (
              <Card key={equipment.equipment_id} equipment={equipment} />
            ))}
      </div>
    </div>

    // <div>

    //   <div className="p-10 ml-56">
    //     {equipments &&
    //       equipments
    //         .filter((equipment) =>
    //           equipment.equipment_name
    //             .toLowerCase()
    //             .startsWith(searchTerm.toLowerCase())
    //         )
    //         .map((equipment) => (
    //           <Card key={equipment.equipment_id} equipment={equipment} />
    //         ))}
    //   </div>
    // </div>
  );
}

// {equipments &&
//   equipments.map((equipment) => (
//     <Card key={equipment.equipment_id} equipment={equipment} />
//   ))}
