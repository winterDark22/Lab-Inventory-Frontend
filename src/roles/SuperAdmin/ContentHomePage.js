import { useState, useEffect } from "react";
export function ContentHomePage(params) {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/adminjobs/seependingregistrations");
        const json = await response.json();

        if (response.ok) {
          setPendingUsers(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRequests();
  }, []);

  console.log("ekhane pending user");
  if (pendingUsers) console.log(pendingUsers);
}
