import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export function ViewSentRequest(params) {
  const { user } = useAuthContext();

  const [allRequests, setAllRequests] = useState([]);

  let hashMap = new Map();
  hashMap.set("waiting for supervisor approval", "blue-600");
  hashMap.set("waiting for lab assistant approval", "blue-600");
  hashMap.set("waiting for head of department approval", "blue-600");
  hashMap.set("waiting for inventory manager approval", "blue-600");
  hashMap.set("accepted", "green-600");
  hashMap.set("rejected", "pinky");

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          `/api/request/showsentrequests/${user.username}`
        );

        const json = await response.json();

        console.log("studeh log");
        console.log(json);

        if (response.ok) {
          setAllRequests(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, []);

  return (
    <div className=" my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold"></h2>
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
              <th scope="col" className="px-6 py-3 text-center">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Lab
              </th>
              <th scope="col" className="pl-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className=" py-3 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allRequests &&
              allRequests.map((request) => (
                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                  <td className="px-6 py-4 font-semibold text-center text-base">
                    {" "}
                    {request.equipment_name}{" "}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {request.location_name}
                  </td>
                  <td className="pl-6 py-4 font-semibold  text-center text-base">
                    {request.quantity}
                  </td>
                  <td
                    className={` py-4 text-center flex items-center justify-center`}
                  >
                    <div
                      className={` bg-${hashMap.get(
                        request.status_name.toLowerCase()
                      )} text-white w-fit px-7 py-1 rounded-lg`}
                    >
                      {request.status_name}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
