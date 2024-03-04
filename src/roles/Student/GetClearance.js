import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export function GetClearance(params) {
  const { user } = useAuthContext();
  const [level, setLevel] = useState("");
  const [term, setTerm] = useState("");
  const [clearance, setClearance] = useState(false);

  const handleSubmit = async () => {
    console.log(`Selected level: ${level}`);
    console.log(`Selected term: ${term}`);

    const response = await fetch(
      `/api/due/createclearancerequest/${user.username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, term }),
      }
    );

    const responseJSON = await response.json();
    setClearance(true);
    console.log(responseJSON);

    //clear
    setLevel("");
    setTerm("");
  };

  useEffect(() => {
    const fetchClearance = async () => {
      try {
        const response = await fetch(
          `/api/due/checkclearanceexistence/${user.username}`
        );
        const json = await response.json();
        console.log("--------");
        console.log(json);
        //console.log(json.length);

        if (response.ok) {
          if (json.length > 0) setClearance(true);
          else setClearance(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchClearance();
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ transform: "translateY(-30%)" }}
    >
      <div className="bg-myCard shadow-md rounded-xl p-16 text-myText">
        {clearance ? (
          <p className="text-myText">
            Your request has been sent to all the labs. You will be notified
            through a message soon.

          </p>
        ) : (
          <>
            <div className="flex justify-between mb-4 gap-16">
              {/* ...rest of your code... */}
              <div>
                <h2 className=" text-md mb-2">Select level</h2>
                <select
                  className="border rounded p-2 text-sm"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="">Select level</option>
                  <option value={1}>level - I</option>
                  <option value={2}>level - II</option>
                  <option value={3}>level - III</option>
                  <option value={4}>level - IV</option>
                </select>
              </div>
              <div>
                <h2 className="text-md mb-2">Select term</h2>
                <select
                  className="border rounded p-2 text-sm"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="">Select term</option>
                  <option value={1}>term - I</option>
                  <option value={2}>term - II</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="mt-4 bg-pinky text-white text-sm rounded p-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

{
  /* <div className="flex justify-between mb-4 gap-16">
          
        </div>
        <div className="flex justify-end">
          <button
            className="mt-4 bg-pinky text-white text-sm rounded p-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div> */
}
