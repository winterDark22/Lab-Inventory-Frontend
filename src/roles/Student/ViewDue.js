import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { differenceInDays } from "date-fns";

export function ViewDue(params) {
  const { user } = useAuthContext();

  const [allDues, setAllDues] = useState([]);

  useEffect(() => {
    const fetchDues = async () => {
      try {
        const response = await fetch(
          `/api/due/viewduesstudent/${user.username}`
        );

        const json = await response.json();
        console.log("here are teh dues of the student");
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
                Lab
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
              allDues.map((due, index) => {
                const dueDate = new Date(due.due_date);
                const today = new Date();
                const daysUntilDue = differenceInDays(dueDate, today);

                let colorClass;

                if (daysUntilDue < 0) {
                  colorClass = "pinky"; // overdue
                } else if (daysUntilDue <= 3) {
                  colorClass = "green-600"; // due in 3 days or less
                } else {
                  colorClass = "blue-600"; // due in more than 3 days
                }

                return (
                  <tr className="bg-myCard border-b-8 border-myBG text-myText">
                    <td className="px-6 py-4 font-semibold text-center text-base">
                      {due.equipment_name}
                    </td>
                    <td className="px-6 py-4 font-semibold  text-center text-base">
                      {due.location_name}
                    </td>
                    <td className="px-6 py-4 font-semibold  text-center text-base">
                      {due.quantity}
                    </td>
                    <td
                      className={` py-4 text-center flex items-center justify-center`}
                    >
                      <div
                        className={` bg-${colorClass} text-white w-fit px-7 py-1 rounded-lg`}
                      >
                        {formatDistanceToNow(dueDate, { addSuffix: true })}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
