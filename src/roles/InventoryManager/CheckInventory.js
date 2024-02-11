import { useStorageContext } from "../../context/StorageContext";
import { ACTION } from "../../context/StorageContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export function CheckInventory() {
  const { user } = useAuthContext();

  const { storage, dispatch } = useStorageContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [quantity, setQuantity] = useState("");

  const filteredStorage = storage.filter((equipment) =>
    equipment.equipment_name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleUpdate = async (equipment) => {
    const equip = {
      name: equipment.equipment_name,
      quantity: quantity,
    };

    const response = await fetch(
      `/api/storage/updatestorage/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equip),
      }
    );

    const responseJSON = await response.json();

    if (response.ok) {
      dispatch({ type: ACTION.UPDATE_STORAGE, payload: responseJSON });
      setQuantity("");
      setShowModal(false);
    }
  };

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          Your Lab Equipments
        </h2>
        <div className="flex ">
          <input
            type="text"
            placeholder="Type here"
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 m-5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr className="border-b-[6px] border-myBG">
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Image</span>
              </th> */}
              <th scope="col" className="px-6 py-3 text-center">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Availability
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Borrowed
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {storage &&
              storage.map((equipment) => (
                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                  {/* <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">
                    <img
                      src="https://www.robotechbd.com/wp-content/uploads/2021/07/frosted-leds-red-green-blue-yellow-white-800x800-1.jpg"
                      className="w-24 md:w-28 rounded-sm sm:rounded-lg hover:scale-105 transition duration-100"
                      alt="LED"
                    />
                  </td> */}
                  <td className="px-6 py-4 font-semibold text-center text-base">
                    {equipment.equipment_name}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.available}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.borrowed}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      href="#"
                      className="font-medium text-green-500 hover:scale-105 transition duration-100 text-base"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
