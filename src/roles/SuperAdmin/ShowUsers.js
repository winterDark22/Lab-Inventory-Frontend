import { useEffect, useState } from "react";

export function ShowUsers(params) {
  const [allUsers, setallUsers] = useState([]);
  //const [selectedLab, setSelectedLab] = useState(null);

  const [labs, setLabs] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState({});

  // related to search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("username");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAssign = async (user_id) => {
    // const location = labs.find((lab) => lab.location_name === searchType);
    const location = labs.find(
      (lab) => lab.location_name === selectedLabs[user_id]
    );

    const response = await fetch(`/api/adminjobs/assignlocation/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location_id: location.location_id,
      }),
    });

    const responsejson = await response.json();

    if (response.ok) {
      //alert("Lab assigned successfully");
      setallUsers(
        allUsers.map((user) =>
          user.user_id === user_id
            ? { ...user, location_name: location.location_name }
            : user
        )
      );
      setSelectedLabs((prevLabs) => {
        const newLabs = { ...prevLabs };
        delete newLabs[user_id];
        return newLabs;
      });
    }
    //setSelectedLab("");
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/adminjobs/showusers");
        const json = await response.json();

        if (response.ok) {
          setallUsers(json);
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
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRequests();
    fetchLabs();
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    let matchesSearchTerm;

    switch (searchType) {
      case "username":
        matchesSearchTerm =
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase());

        break;
      case "role":
        matchesSearchTerm = user.role
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        break;
      case "location":
        matchesSearchTerm = user.location_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        break;
      default:
      // Add more cases as needed
    }
    return matchesSearchTerm;
  });

  return (
    <div className=" my-2 min-h-screen rounded-2xl ">
      <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <div className="flex justify-between m-5">
          <div className="flex items-center justify-between gap-5"></div>
          <div className="flex items-center justify-between gap-5">
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
              <option value="username">username</option>
              <option value="role">role</option>
              <option value="location">location</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-white uppercase bg-primary">
              <tr className="border-b-[6px] border-myBG">
                <th scope="col" className="px-6 py-3 text-center">
                  username
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  role
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  current location
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  change Location
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  id
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <tr className="bg-myCard border-b-8 border-myBG text-myText">
                    <td className="text-start pl-24 rounded-lg overflow-hidden p-2">
                      <td className="px-6 py-4 font-semibold text-base">
                        {user.first_name + " " + user.last_name}
                        <p className="text-sm font-normal text-gray-500">
                          {user.email}
                        </p>
                      </td>
                    </td>
                    <td className="px-6 py-4 font-semibold text-center text-base">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 font-semibold text-center text-base">
                      {user.location_name}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <select
                        value={selectedLabs[user.user_id] || ""}
                        onChange={(e) =>
                          setSelectedLabs({
                            ...selectedLabs,
                            [user.user_id]: e.target.value,
                          })
                        }
                        className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"

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
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        href="#"
                        onClick={() => {
                          setSelectedLabs(selectedLabs[user.user_id]);
                          handleAssign(user.user_id);
                        }}
                        className="font-bold text-green-700 hover:scale-105 transition duration-100 text-base"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4 font-semibold text-center text-base">
                      {user.user_id}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
