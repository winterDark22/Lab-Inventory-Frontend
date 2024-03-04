import { useState, useEffect } from "react";

export function ContentHomePage(params) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [searchType, setSearchType] = useState("");

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleOptionClick = (option) => {
  //   setSelectedLab(option);
  //   setIsOpen(false);
  // };

  const handleAssign = async (user_id) => {
    console.log("searh      type");
    console.log(searchType);

    const location = labs.find((lab) => lab.location_name === searchType);

    console.log("location");
    console.log(location);

    const response = await fetch(`/api/adminjobs/assignlocation/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_id: location.location_id,
      }),
    });

    if (response.ok) {
      //alert("Lab assigned successfully");

      setPendingUsers(pendingUsers.filter((user) => user.user_id !== user_id));
    }
    setSelectedLab("");
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/adminjobs/seependingregistrations");
        const json = await response.json();

        console.log("nehiii");
        console.log(json);
        if (response.ok) {
          setPendingUsers(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchLabs = async () => {
      try {
        const response = await fetch("/api/adminjobs/getlabs");
        const json = await response.json();

        if (response.ok) {
          setLabs(json);
        }

        console.log("khklfdh");
        console.log(json);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRequests();
    fetchLabs();
  }, []);

  return (
    <div className=" my-2 min-h-screen rounded-2xl ">
      <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5"></div>

      <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr className="border-b-[6px] border-myBG">
              <th scope="col" className="px-6 py-3 text-center">
                user name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                role
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {pendingUsers &&
              pendingUsers.map((user) => (
                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                  <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">
                    <td className="px-6 py-4 font-semibold text-center text-base">
                      {user.first_name + " " + user.last_name}
                    </td>
                  </td>
                  <td className="px-6 py-4 font-semibold text-center text-base">
                    {user.role}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      placeholder="Select Lab"
                      className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-[200px] p-2.5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
                    >
                      <option value="" disabled>
                        Select Lab
                      </option>
                      {/* Add more options as needed */}
                      {labs.map((option) => (
                        <option
                          key={option.location_id}
                          value={option.location_name}
                        >
                          {option.location_name}
                        </option>
                      ))}
                    </select>

                    {/* <button
                      onClick={toggleDropdown}
                      type="button"
                      className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Select Lab
                    </button> */}

                    {/* {isOpen && (
                      <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
                        <ul>
                          {labs.map((option) => (
                            <li
                              key={option.location_name}
                              onClick={() => handleOptionClick(option)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {option.location_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )} */}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      href="#"
                      onClick={() => {
                        setSelectedLab(searchType);
                        handleAssign(user.user_id);
                      }}
                      className="font-medium text-green-500 hover:scale-105 transition duration-100 text-base"
                    >
                      Assign
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
