import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

export function ViewLostDamaged(params) {
  const { user } = useAuthContext();
  const [allDamages, setAllDamages] = useState([]);
  const [selectedDue, setSelectedDue] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [due, setDue] = useState({});
  const [date, setdate] = useState("");

  // searching purpose
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
        `/api/due/showestimatedue/${user.username}/${due.due_id}`
      );

      const json = await response.json();
      if (response.ok) {
        setSelectedDue({
          damage_quantity: due.damage_quantity,
          estimated_cost: json.estimated_cost,
          assign_due: 0,
        }); //damaged q, estimated due, assign due
        setDue(due);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClear = async (due) => {
    try {
      const response = await fetch(
        `/api/due/cleardue/${user.username}/${due.due_id}`,
        {
          method: "POST",
        }
      );

      const responseJSON = await response.json();

      if (response.ok) {
        // const updatedDues = allDues.filter((due) => due.due_id !== dueId);
        // setAllDues(updatedDues);

        console.log("ki hoise");
        console.log(responseJSON);
        setAllDamages(allDamages.filter((d) => d.due_id !== due.due_id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSend = async () => {
    const response = await fetch(
      `/api/due/createmonetarydue/${user.username}/${due.due_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount, dueDate: date }),
      }
    );

    const responseJSON = await response.json();
    console.log("dfjlkdjfl;d");
    console.log(responseJSON);

    if (response.ok) {
      setAllDamages(
        allDamages.map((d) => {
          if (d.due_id === due.due_id) {
            return { ...d, monetary_assigned: 1 };
          }
          return d;
        })
      );

      setShowModal(false);
      setSelectedDue({});
      setDue({});
      setAmount(0);
      setdate("");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedDue({});
    setDue({});
    setAmount(0);
    setdate("");
  };

  useEffect(() => {
    const fetchDamages = async () => {
      try {
        const response = await fetch(
          `/api/due/viewlostordamaged/${user.username}`
        );

        const json = await response.json();
        console.log("here are the damages of the lab assistant");
        console.log(json);
        if (response.ok) {
          setAllDamages(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDamages();
  }, []);

  const filteredDamage = allDamages.filter((damage) => {
    let matchesSearchTerm = true;
    switch (searchType) {
      case "Equipment name":
        matchesSearchTerm = damage.equipment_name
          ? damage.equipment_name
              .toLowerCase()
              .startsWith(searchTerm.toLowerCase())
          : false;
        break;
      case "Student ID":
        matchesSearchTerm = damage.username
          ? damage.username.toLowerCase().startsWith(searchTerm.toLowerCase())
          : false;
        break;
      default:
      // Add more cases as needed
    }

    let matchesSearchDate = true;
    if (searchDate) {
      const recordDate = new Date(damage.issue_date);
      const searchDateObj = new Date(searchDate);
      matchesSearchDate =
        recordDate.getFullYear() === searchDateObj.getFullYear() &&
        recordDate.getMonth() === searchDateObj.getMonth() &&
        recordDate.getDate() === searchDateObj.getDate();
    }
    return matchesSearchTerm && matchesSearchDate;
  });

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <div className="flex items-center justify-between gap-4 ">
          <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
            Lost/Damaged
          </h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />

          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          >
            <option value="Equipment name">Equipment name</option>
            <option value="Student ID">Student ID</option>
            {/* Add more options as needed */}
          </select>

          <input
            type="date"
            value={searchDate}
            onChange={handleDateSearch}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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
                Damaged Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Clear Due
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Monetary Due
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDamage &&
              [...filteredDamage]
                .sort((a, b) => {
                  const dueDateA = new Date(a.issue_date);
                  const dueDateB = new Date(b.issue_date);
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
                        {due.quantity}
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.damage_quantity}
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
                        <button
                          className="mx-2 py-1 px-3 bg-blue-500 text-white rounded"
                          onClick={() => handleClear(due)}
                        >
                          Clear
                        </button>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        <button
                          className={`mx-2 py-1 px-3 bg-blue-500 text-white rounded ${
                            due.monetary_assigned === 1
                              ? "disabled:opacity-50 disabled:cursor-not-allowed"
                              : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                          }`}
                          disabled={due.monetary_assigned === 1}
                          onClick={() => handleReport(due)}
                        >
                          Create
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed w-full bg-black bg-opacity-50 top-0 left-0 z-30">
            <div className="flex items-center justify-center min-h-screen  sm:block sm:p-0">
              {/* ...rest of the modal code... */}
              <div className="bg-white ml-[35vw] rounded-lg text-left overflow-hidden sm:mt-[20vh] sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:flex-col fle items-stretch">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Comments
                      </h3>

                      <div className="mt-4">
                        <h5 className="text-lg leading-6 font-medium text-gray-900">
                          Damaged Quantity:{" "}
                          {selectedDue && selectedDue.damage_quantity}
                        </h5>
                      </div>

                      <div className="mt-4">
                        <h5 className="text-lg leading-6 font-medium text-gray-900">
                          Estimated cost:{" "}
                          {selectedDue && selectedDue.estimated_cost}
                        </h5>
                      </div>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Charged Amount:
                      </h3>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />

                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex justify-center gap-12 ">
                  <button
                    onClick={() => handleCancel()}
                    className="text-white bg-pinky  border-0 py-1 sm:px-4 px-2 focus:outline-none hover:bg-primary rounded-lg text-base"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white  bg-green-600 border-0 sm:px-4 px-2 py-1 focus:outline-none  hover:bg-green-700 rounded-lg text-base"
                    onClick={() => handleSend()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
