import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export function ViewDues(params) {
  const { user } = useAuthContext();

  const [allDues, setAllDues] = useState([]);

  useEffect(() => {
    const fetchDues = async () => {
      try {
        const response = await fetch(
          `/api/due/viewdueslocation/${user.username}`
        );

        const json = await response.json();
        console.log("here are teh dues of the lab assistant");
        console.log(json);

        if (response.ok) {
          setAllDues(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDues();
  }, []);

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          Your DUES
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
                Student
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {allDues &&
              allDues.map((due, index) => (
                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                  {/* <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">
                    <img
                      src="https://www.robotechbd.com/wp-content/uploads/2021/07/frosted-leds-red-green-blue-yellow-white-800x800-1.jpg"
                      className="w-24 md:w-28 rounded-sm sm:rounded-lg hover:scale-105 transition duration-100"
                      alt="LED"
                    />
                  </td> */}
                  <td className="px-6 py-4 font-semibold text-center text-base">
                    {due.equipment_name}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {due.username}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {due.quantity}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {formatDistanceToNow(new Date(due.due_date), {
                      addSuffix: true,
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
