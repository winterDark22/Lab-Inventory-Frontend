import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function Notification(params) {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { newNotificationCnt, setNewNotificationCnt } =
    useNotificationContext();

  const [allNotifications, setAllNotifications] = useState([]);

  const handleClick = async (notification) => {
    if (notification.notification_type === 1) {
      navigate("/student/viewDue", { state: { notification } });
    } else if (notification.notification_type === 2) {
      navigate("/student/viewRequest", { state: { notification } });
    } else if (notification.notification_type === 6) {
      navigate("/student/viewMonetaryDue", { state: { notification } });
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(
          `/api/notification/shownotifications/${user.username}`
        );

        const json = await response.json();

        if (response.ok) {
          setAllNotifications(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNotification();
  }, []);

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          Notifications
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
          <tbody>
            {allNotifications &&
              allNotifications
                .sort(
                  (a, b) =>
                    new Date(b.notification_time) -
                    new Date(a.notification_time)
                )
                .map((notification, index) => (
                  <tr
                    key={notification.id}
                    onClick={() => handleClick(notification)}
                    // className="mb-8 border-b-2 bg-amber-500 hover:bg-amber-600 cursor-pointer"
                    className={`mb-8 border-b-8 border-myBG cursor-pointer h-10 ${
                      index < newNotificationCnt ? "bg-newNoti" : "bg-myCard"
                    }`}
                  >
                    <td
                      className={`mb-8 border-b-3 cursor-pointer pl-3 ${
                        index < newNotificationCnt
                          ? "text-white"
                          : "text-myText"
                      }`}
                    >
                      {notification.sender_role} {notification.sender_name} has
                      sent you a msg: "{notification.notification}"
                    </td>
                    <td>
                      {new Date(
                        notification.notification_time
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
