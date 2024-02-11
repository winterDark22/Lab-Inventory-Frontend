import { useEffect, useState } from "react";

import Card from "../../components/Card";

export function AddRequest(params) {
  const [allEquipments, setAllEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("/api/equipments/showinventoryequipments");

        const json = await response.json();

        if (response.ok) {
          setAllEquipments(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, []);

  return (
    <div className=" my-2 min-h-screen">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          In the Inventory
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
        {allEquipments &&
          allEquipments.map((equipment) => (
            <Card key={allEquipments.equipment_id} equipment={equipment} />
          ))}
      </div>
    </div>
  );
}
