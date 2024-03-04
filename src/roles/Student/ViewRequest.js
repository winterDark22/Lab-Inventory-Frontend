import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNotificationContext } from "../../context/NotificationContext";
import { useLocation } from "react-router-dom";

export function ViewRequest(params) {
  const location = useLocation();
  const notification = location.state ? location.state.notification : null;

  const { user } = useAuthContext();
  const { setNewNotificationCnt } = useNotificationContext();

  const [allRequests, setAllRequests] = useState([]);
  const [filter, setFilter] = useState("All"); // filter requests by status

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Equipment name");
  const [searchDate, setSearchDate] = useState("");
  const [seconds, setSeconds] = useState(0);

  let hashMap = new Map();
  hashMap.set("waiting for supervisor approval", "blue-600");
  hashMap.set("waiting for lab assistant approval", "blue-600");
  hashMap.set("waiting for head of department approval", "blue-600");
  hashMap.set("waiting for inventory manager approval", "blue-600");
  hashMap.set("accepted", "green-600");
  hashMap.set("rejected", "pinky");

  const handleDateSearch = (event) => {
    setSearchDate(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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

    const fetchUnseenNotification = async () => {
      try {
        const response = await fetch(
          `/api/notification/getunseennotificationcount/${user.username}`
        );
        const json = await response.json();

        console.log(json);

        if (response.ok) {
          setNewNotificationCnt(json.unseen_notification_count);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
    fetchUnseenNotification();

    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval); // This will clear the interval if the component unmounts
  }, []);

  const filteredRequestsByStatus = allRequests.filter((request) => {
    if (filter === "All") return true;

    if (filter === "Accepted") return request.status_name === "Accepted";

    if (filter === "Rejected") return request.status_name === "Rejected";
    if (filter === "Waiting")
      return (
        request.status_name !== "Accepted" && request.status_name !== "Rejected"
      );
  });

  const filteredRequests = filteredRequestsByStatus.filter((request) => {
    let matchesSearchTerm = true;
    switch (searchType) {
      case "Equipment name":
        matchesSearchTerm = request.equipment_name
          ? request.equipment_name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase())
          : false;
        break;
      case "Location":
        matchesSearchTerm = request.username
          ? request.location_name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase())
          : false;
        break;

      default:
      // Add more cases as needed
    }

    return matchesSearchTerm;
  });

  return (
    <div className=" my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between m-5">
        <div className="flex items-center justify-between gap-4 ">
          <button
            onClick={() => setFilter("All")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "All" ? "text-primary" : ""}`}
          >
            {" "}
            All
          </button>
          <button
            onClick={() => setFilter("Waiting")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Waiting" ? "text-primary" : ""}`}
          >
            {" "}
            Waiting
          </button>
          <button
            onClick={() => setFilter("Accepted")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Accepted" ? "text-primary" : ""}`}
          >
            {" "}
            Accepted
          </button>
          <button
            onClick={() => setFilter("Rejected")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Rejected" ? "text-primary" : ""}`}
          >
            {" "}
            Rejected
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
            <option value="Location">Location</option>

            {/* Add more options as needed */}
          </select>
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
            {filteredRequests &&
              filteredRequests
                .sort((a, b) => new Date(b.req_time) - new Date(a.req_time))
                .map((request) => {
                  const isHighlighted =
                    notification && request.req_id === notification.type_id;

                  return (
                    <tr
                      className={`bg-myCard border-b-8 border-myBG text-myText  ${(isHighlighted && seconds < .1) ? " bg-newNoti shadow-md p-5 duration-300 " : "duration-500 "
                        }`}
                    >
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
                        className={`py-4 text-center flex items-center justify-center`}
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
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
