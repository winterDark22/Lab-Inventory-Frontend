import { useEffect, useState } from "react";

export function ShowUsers(params) {
  const [allUsers, setallUsers] = useState([]);

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
    fetchRequests();
  }, []);

  console.log("ekhane all user");
  console.log(allUsers);
}
