import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//import icons
import { HiMenuAlt3, HiMenu } from "react-icons/hi";
import {
  MdOutlineDashboardCustomize,
  MdOutlineTableView,
  MdListAlt,
  MdOutlineLogout,
  MdNotifications,
  MdPeopleAlt,
  MdOutlineReceiptLong,
} from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import {
  FaSortAmountUp,
  FaUserAlt,
  FaEnvelope,
  FaCalculator,
} from "react-icons/fa";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";

//import pages
import { useAuthContext } from "../../context/AuthContext";
import { CheckLabEquipments } from "./CheckLabEquipments";
import { LabEquipmentRequests } from "./LabEquipmentRequests";
import { ClearanceRequests } from "./ClearanceRequests";
import { ShowUsers } from "./ShowUsers";
import { Notification } from "./Notification";
import { useLogout } from "../../hook/useLogout";
import { ContentHomePage } from "./ContentHomePage";

function AdminHome() {
  //user fetching
  const { user } = useAuthContext();
  const { username, role } = user;
  const { logout } = useLogout();

  const menus = [
    {
      name: "Check on lab equipments",
      link: "CheckLabEquipments",
      icon: MdOutlineTableView,
    },

    {
      name: "Lab equipment requests",
      link: "labEquipmentRequests",
      icon: MdOutlineReceiptLong,
    },
    {
      name: "Show users",
      link: "ShowUsers",
      icon: MdPeopleAlt,
    },

    {
      name: "Clearance requests",
      link: "clearanceRequests",
      icon: FaBuildingCircleArrowRight,
    },
    { name: "Notification", link: "notification", icon: MdNotifications },
    { name: "Log Out", link: "logout", icon: MdOutlineLogout },
  ];
  const [open, setOpen] = useState(true);

  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    logout();
  };

  const handleResize = () => {
    // Update state based on screen width
    if (window.innerWidth < 1024) setOpen(false);
    else if (window.innerWidth > 1024) setOpen(true);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  let userRole;
  if (open) {
    userRole = (
      <div
        className={`absolute w-64 bottom-5 bg-green-600 p-y-1 rounded-full
          whitespace-pre duration-200
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}
          `}
      >
        <Link to={""} onClick={() => handleLinkClick("")}>
          <span className=" text-center block"> {role.toUpperCase()} </span>
        </Link>
      </div>
    );
  } else {
    userRole = (
      <div
        className={`absolute bottom-5 bg-green-600 rounded-full p-2
          whitespace-pre duration-200 group
            ${open && "opacity-0 translate-x-28 overflow-hidden"} 
          `}
      >
        <Link to={""} onClick={() => handleLinkClick("")}>
          <GoHomeFill size={20} />
          <h2
            className={`${open && "hidden"}
                  absolute left-48 bg-white font-semibold whitespace-pre
                  text-green-600 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-200 group-hover:w-fit bottom-7 -translate-x-8 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300`}
          >
            {role.toUpperCase()}
          </h2>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={`flex ${open ? "gap-1" : "gap-4"} bg-myBG`}>
        <aside className={"z-20"}>
          <div
            className={`sticky top-0 min-h-screen transition duration-100 bg-primary ${
              open
                ? "w-[320px] rounded-[35px] border-[16px] border-myBG"
                : "w-16 rounded-r-3xl"
            }
            duration-200 text-gray-100 px-4 relative  `}
          >
            <div className={`py-3 flex justify-between items-center pt-5 `}>
              <h2
                className={`font-bold font-roboto text-2xl pl-3 ${
                  !open && "hidden"
                }`}
              >
                Your Options
              </h2>
              <HiMenuAlt3
                size={35}
                className={`cursor-pointer ml-1 font-bold ${
                  !open && "hidden"
                } p-1 hover:bg-pinky rounded-md `}
                onClick={() => setOpen(!open)}
              />
              <HiMenu
                size={35}
                className={`cursor-pointer ml-1 font-bold ${
                  open && "hidden"
                } hover:bg-pinky rounded-md `}
                onClick={() => setOpen(!open)}
              />

              {/* <div className=' bg-white rounded-full py-1 translate-x-8 border border-primary'><MdArrowBackIos
                size={26}
                color="#bf1430"
                className='cursor-pointer ml-2'
                onClick={() => setOpen(!open)}
              /></div> */}
            </div>
            <hr className="border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5" />

            <div className="mt-3 flex flex-col gap-2 relative">
              {menus?.map((menu, i) => (
                <Link
                  to={menu?.link}
                  key={i}
                  onClick={() => {
                    menu.name === "Log Out"
                      ? handleLogout()
                      : handleLinkClick(menu?.link);
                    //handleLinkClick(menu?.link);
                  }}
                  className={`group flex items-center text-medium gap-3.5 font-medium p-3.5 rounded-md 
                     hover:bg-pinky hover:scale-95
                      ${
                        activeLink === menu?.link
                          ? "hover:shadow-xl scale-105 shadow-lg bg-pinky"
                          : ""
                      }
                    active:scale-105 active:shadow-xl focus:hover:shadow-xl focus:scale-105 focus:shadow-lg focus:bg-pinky`}
                >
                  <div className={`font-bold ${!open && "-translate-x-2"} `}>
                    {React.createElement(menu?.icon, { size: "20" })}
                  </div>

                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-300
                  ${!open && "opacity-0 translate-x-28 overflow-hidden"} `}
                  >
                    {menu?.name}
                  </h2>

                  <h2
                    className={`${open && "hidden"}
                  absolute left-48 bg-white font-semibold whitespace-pre
                  text-primary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-200 group-hover:w-fit`}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ))}
            </div>

            {userRole}
          </div>
        </aside>

        <main className="m-3 text-xl text-gray-900 font-semibold w-full relative">
          <div className="">
            <nav className="min-h-28 w-full bg-myBG border sticky -top-1 -mt-4 pt-1.5 z-10">
              <div
                className={`flex justify-between items-center max-w-[1500px] mt-8`}
              >
                <h2
                  className={` font-bold font-roboto text-2xl md:text-3xl lg:text-[38px] text-left text-primary md:leading-[46px] leading-8`}
                >
                  CSE Lab Inventory
                  <br className="sm:hidden" /> Management System
                </h2>

                <ul className="flex flex-wrap  justify-between gap-2 sm:mr-10 -mr-3">
                  <Link
                    to={""}
                    onClick={() => handleLinkClick("")}
                    className={`group flex md:items-center font-medium gap-1  rounded-full  p-3 justify-center
                     hover:scale-110 text-sm 
                    active:scale-105 active:shadow-xl hover:shadow-xl focus:scale-125 focus:shadow-lg  text-myText `}
                  >
                    <div className={`font-bold`}>
                      {React.createElement(FaEnvelope, { size: "18" })}
                    </div>

                    {/* <h2
                      className={`whitespace-pre duration-300 hidden md:block`}>Message
                    </h2> */}
                  </Link>
                  <li>
                    <Link
                      to={""}
                      onClick={() => handleLinkClick("")}
                      className={`group flex md:items-center font-medium gap-1 rounded-full  p-3 justify-center
                     text-md  hover:scale-110
                    active:scale-105 active:shadow-xl hover:shadow-xl focus:scale-125 focus:shadow-lg  text-myText `}
                    >
                      <div className={`font-bold`}>
                        {React.createElement(FaUserAlt, { size: "18" })}
                      </div>

                      <h2
                        className={`whitespace-pre duration-300 hidden md:block`}
                      >
                        {" "}
                        {username}
                      </h2>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <div>
              <Routes>
                <Route path="" element={<ContentHomePage />} />
                <Route
                  path="checkLabEquipments"
                  element={<CheckLabEquipments />}
                />
                <Route
                  path="labEquipmentRequests"
                  element={<LabEquipmentRequests />}
                />
                <Route path="ShowUsers" element={<ShowUsers />} />
                <Route
                  path="clearanceRequests"
                  element={<ClearanceRequests />}
                />
                <Route path="notification" element={<Notification />} />
              </Routes>
            </div>

            <footer className="bg-myBG border sm:h-16 w-full ">
              <div
                className={`flex flex-wrap sm:justify-between items-center max-w-[1240px] ${
                  open ? "mx-7" : "mx-auto"
                }  text-gray-500 font-normal text-base mt-5`}
              >
                <h2 className=" ml-16 sm:ml-0">
                  {" "}
                  © {new Date().getFullYear()}
                  <a
                    href="https://www.buet.ac.bd/web/#/"
                    className="font-bold hover:text-primary text-black"
                    target="_blank"
                  >
                    {" "}
                    &nbsp;BUET&nbsp;{" "}
                  </a>
                  All Rights Reseverd.
                </h2>

                <ul className="flex justify-between gap-5 ml-5 sm:ml-0">
                  <li>
                    <a
                      href="https://cse.buet.ac.bd/"
                      target="_blank"
                      className="hover:text-primary"
                    >
                      Department of CSE
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="" target="_blank" className="hover:text-primary">
                      About Us
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="" target="_blank" className="hover:text-primary">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="" target="_blank" className="hover:text-primary">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminHome;
