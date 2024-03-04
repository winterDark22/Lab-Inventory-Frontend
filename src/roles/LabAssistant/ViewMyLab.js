import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export function ViewMyLab(params) {
  const { user } = useAuthContext();

  const [labEquipments, setLabEquipments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleAlert = async (event) => {
    const response = await fetch(`/api/due/duedatealert/${user.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJSON = await response.json();
    console.log(" working");
    console.log(responseJSON);
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          `/api/equipments/labassistant/${user.username}`
        );

        const json = await response.json();
        console.log(json);

        if (response.ok) {
          setLabEquipments(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, []);

  const filteredStorage = labEquipments.filter((equipment) =>
    equipment.equipment_name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between m-5">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          Your Lab Equipments
        </h2>
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={handleAlert}
            className="hover:text-white text-xs uppercase p-3 w-24 rounded-lg text-white bg-primary active:text-myText"
          >
            Send Alert
          </button>
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
            </tr>
          </thead>
          <tbody>
            {labEquipments &&
              labEquipments.map((equipment, index) => (
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
