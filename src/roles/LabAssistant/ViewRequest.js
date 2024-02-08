import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
function ViewRequest() {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //   const [req_id, setreq_id] = useState(0);
  const handleOk = async (req_id) => {
    setIsOkClicked(false);

    const response = await fetch(
      `/api/request/addcomment/${req_id}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: inputValue }),
      }
    );
    const responseJSON = await response.json();

    setInputValue("");
  };

  const handleAccept = async (req_id) => {
    const response = await fetch(
      `/api/request/acceptrequest/${req_id}/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setIsOkClicked(true);
    }
    // console.log("acccpet korteeeeeeeeee");
    // console.log(responseJSON);
  };

  const handleDelete = async (req_id) => {
    const response = await fetch(
      `/api/request/declinerequest/${req_id}/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    console.log("delelte");
    console.log(responseJSON);
    if (response.ok) {
      setIsOkClicked(true);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/request/showrequests/${username}`);
        const json = await response.json();

        console.log("view requse");
        console.log(json);
        if (response.ok) {
          setallRequests(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRequests();
  }, []);
  return (
    <div>
      <h1>View Requests</h1>
      <div>
        {allRequests.map((item, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            <p>
              <strong>Available:</strong> {item.available}
            </p>
            <p>
              <strong>Equipment Name:</strong> {item.equipment_name}
            </p>
            <p>
              <strong>Permit:</strong> {item.permit}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Req ID:</strong> {item.req_id}
            </p>
            <p>
              <strong>Req Time:</strong> {item.req_time}
            </p>
            <p>
              <strong>Status Name:</strong> {item.status_name}
            </p>
            <p>
              <strong>Username:</strong> {item.username}
            </p>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => {
                handleAccept(item.req_id);
              }}
            >
              Accept
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => {
                handleDelete(item.req_id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={item.permit <= 1}
            >
              Forward
            </button>

            {isOkClicked && (
              <div>
                <input
                  type="text"
                  className="border p-2 rounded mr-2"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleOk(item.req_id)}
                >
                  Ok
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewRequest;
