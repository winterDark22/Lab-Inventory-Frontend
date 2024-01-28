import { useEffect } from "react";

import { Navbar } from "../../components/Navbar";
import { useEquipmentsContext } from "../../context/EquipmentsContext";
import { ACTION } from "../../context/EquipmentsContext";
import { useAuthContext } from "../../context/AuthContext";
import Card from "../../components/Card";

export function Home() {
  const { equipments, dispatch } = useEquipmentsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`/api/equipments/${user.username}`);

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
    <div>
      THIS IS THE HOME PAGE OF INVENTORY MANAGER
      <Navbar />
      <div className="p-10 ml-56">
        {equipments &&
          equipments.map((equipment) => (
            <Card key={equipment.equipment_id} equipment={equipment} />
          ))}
      </div>
    </div>
  );
}
