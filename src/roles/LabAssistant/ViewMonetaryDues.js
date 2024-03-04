import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

export function ViewMonetaryDues(params) {
  const { user } = useAuthContext();
  const [allMonetaryDues, setallMonetaryDues] = useState([]);

  const [filter, setFilter] = useState("Pending"); // filter requests by status
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Equipment name");
  const [searchDate, setSearchDate] = useState("");

  const handleDateSearch = (event) => {
    setSearchDate(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReport = async (due) => {
    try {
      const response = await fetch(
        `/api/due/clearmonetarydue/${user.username}/${due.monetary_due_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      console.log("cleraed done");
      console.log(json);
      if (response.ok) {
        setallMonetaryDues(
          allMonetaryDues.map((due) => {
            if (due.monetary_due_id === json.monetary_due_id) {
              due.status_name = "Cleared";
              due.clear_date = json.clear_date;
            }
            return due;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchDamages = async () => {
      try {
        const response = await fetch(
          `/api/due/monetarydueslocation/${user.username}`
        );

        const json = await response.json();
        console.log("here are them monetary dues");
        console.log(json);
        if (response.ok) {
          setallMonetaryDues(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDamages();
  }, []);

  const filteredRequestsByStatus = allMonetaryDues.filter((request) => {
    if (filter === "Pending") return request.status_name !== "Cleared";
    if (filter === "Cleared") return request.status_name === "Cleared";
  });

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between m-5">
        <div className="flex items-center justify-between gap-4 ">
          <button
            onClick={() => setFilter("Pending")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Pending" ? "text-primary" : ""}`}
          >
            {" "}
            Pending
          </button>
          <button
            onClick={() => setFilter("Cleared")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Cleared" ? "text-primary" : ""}`}
          >
            {" "}
            Cleared
          </button>



        </div>
        <div className="flex justify-between items-center gap-5">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
          />

          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
          >
            <option value="Equipment name">Equipment name</option>
            <option value="Lab assistant name">Lab assistant name</option>
            {/* Add more options as needed */}
          </select>

          <input
            type="date"
            value={searchDate}
            onChange={handleDateSearch}
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
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
                Damaged Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Amount(tk)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Clear Due
              </th>
            </tr>
          </thead>
          <tbody>
            {allMonetaryDues &&
              [...allMonetaryDues]
                .sort((a, b) => {
                  const dueDateA = new Date(a.due_date);
                  const dueDateB = new Date(b.due_date);
                  return dueDateB - dueDateA;
                })
                .map((due, index) => {
                  return (
                    <tr className="bg-myCard border-b-8 border-myBG text-myText">
                      <td className="px-6 py-4 font-semibold text-center text-base">
                        {due.equipment_name}
                        <p className="text-sm text-gray-500">
                          Issued:&nbsp;
                          {format(new Date(due.issue_date), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.username}
                      </td>

                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.damage_quantity}
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.amount} tk
                      </td>
                      <td
                        className={` py-4 text-center flex items-center justify-center`}
                      >
                        <div className=" text-black w-fit px-7 py-1 rounded-lg">
                          {formatDistanceToNow(due.due_date, {
                            addSuffix: true,
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.status_name}
                      </td>

                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        <button
                          className={` duration-300 text-sm uppercase text-white md:text-blue-500  ${due.status_name === "Cleared"
                            ? "disabled:opacity-50 disabled:cursor-not-allowed"
                            : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                            }`}
                          disabled={due.status_name === "Cleared"}
                          onClick={() => handleReport(due)}
                        >
                          Clear
                        </button>
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
