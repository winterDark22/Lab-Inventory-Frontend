import { useEffect } from "react";

import { useEquipmentsContext } from "../../context/EquipmentsContext";
import { ACTION } from "../../context/EquipmentsContext";

import Card from "../../components/Card";

function Home() {
  const { equipments, dispatch } = useEquipmentsContext();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("/api/equipments");

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: ACTION.SET_EQUIPMENT, payload: json });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, [dispatch]);

  return (
    <div>
      THIS IS THE HOME PAGE OF INVENTORY MANAGER
      <div>
        {equipments &&
          equipments.map((equipment) => (
            <Card key={equipment.equipment_id} equipment={equipment} />
          ))}
      </div>
    </div>
  );
}

export default Home;
