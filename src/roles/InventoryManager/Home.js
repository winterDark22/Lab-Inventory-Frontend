import { useEffect, useState } from "react";

import { useStorageContext } from "../../context/StorageContext";
import { ACTION } from "../../context/StorageContext";
import { useAuthContext } from "../../context/AuthContext";
import Card from "../../components/Card";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { storage, dispatch } = useStorageContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`/api/equipments/${user.username}`);

        const json = await response.json();

        console.log(json);

        if (response.ok) {
          dispatch({ type: ACTION.SET_STORAGE, payload: json });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, [user.username, dispatch]);

  return (
    <div>
      <div className="ml-96 mt-14">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
      </div>
      <div className="p-2 ml-56 ">
        {storage &&
          storage
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
  );
}

// {equipments &&
//   equipments.map((equipment) => (
//     <Card key={equipment.equipment_id} equipment={equipment} />
//   ))}
