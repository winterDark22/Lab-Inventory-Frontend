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
    <div className=" ml-72 p-6">
      <h1 className="text-2xl font-bold mb-4">This is CheckInventory page</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <table className="min-w-full table-auto">
        <thead className="justify-between">
          <tr className="bg-red-800">
            <th className="px-16 py-2">
              <span className="text-white">Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Availability</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Borrowed</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Update</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {filteredStorage.map((equipment) => (
            <tr
              key={equipment.equipment_id}
              className="bg-white border-4 border-gray-200 text-center"
            >
              <td className="px-16 py-2">{equipment.equipment_name}</td>
              <td className="px-16 py-2">{equipment.available}</td>
              <td className="px-16 py-2">{equipment.borrowed}</td>
              <td className="px-16 py-2">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setSelectedEquipment(equipment);
                  }}
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {showModal && selectedEquipment && (
          <div className="fixed w-full bg-slate-800 bg-opacity-80 top-0 left-0">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* ...rest of the modal code... */}
              <div className="bg-white ml-[500px] px-10 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedEquipment.equipment_name}
                      </h3>
                      <div className="mt-4">
                        <input
                          type="text"
                          value={quantity}
                          placeholder="Quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                          className="p-2 border rounded text-sm w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex ">
                  <button
                    onClick={() => handleUpdate(selectedEquipment)}
                    className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg ml-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </table>
    </div>
  );
}
