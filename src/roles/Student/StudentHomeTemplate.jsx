import React from 'react'
import StudentSideNav from '../../components/StudentSideNav.jsx'
import { HiMenuAlt3, HiMenu } from "react-icons/hi";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import {
    MdOutlineDashboardCustomize, MdOutlineTableView, MdArrowBackIos, MdMenu,
    MdEditSquare, MdCheckBox
}
    from "react-icons/md";
import { CiViewList, CiLogout } from "react-icons/ci";
import { IoReceiptOutline, IoNotificationsOutline } from "react-icons/io5";
import {
    FaBuildingCircleArrowRight,
    FaSquareXmark
} from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { GoHomeFill } from "react-icons/go";

import { FaSortAmountUp, FaUserAlt, FaEnvelope } from "react-icons/fa";



function StudentHome() {


    const menus = [
        { name: "Add Request", link: '/', icon: MdOutlineDashboardCustomize },
        { name: "View Request", link: '/', icon: CiViewList },
        { name: "View Dues", link: '/', icon: MdOutlineTableView },
        { name: "Moneteray Dues", link: '/', icon: IoReceiptOutline },
        { name: "Get Clearance", link: '/', icon: FaBuildingCircleArrowRight },
        { name: "Notifications", link: '/', icon: IoNotificationsOutline },
        { name: "Log Out", link: '/', icon: CiLogout },

    ]
    const [open, setOpen] = useState(true);

    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleResize = () => {
        // Update state based on screen width
        if (window.innerWidth < 1024)
            setOpen(false);
        else if (window.innerWidth > 1024)
            setOpen(true);

    };

    useEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures that this effect runs only once on mount

    let userRole
    if (open) {
        userRole = <div
            className={`absolute w-64 bottom-5 bg-green-500 p-y-1 rounded-full
          whitespace-pre duration-200
            ${!open && "opacity-0 translate-x-28 overflow-hidden"}
          `}>
            <Link to={''}>
                <span className=' text-center block'> STUDENT HOME</span>

            </Link>
        </div>
    }
    else {
        userRole =
            <div
                className={`absolute bottom-5 bg-green-500 rounded-full p-2
          whitespace-pre duration-200 group hover:scale-105
            ${open && "opacity-0 translate-x-28 overflow-hidden"} 
          `}>
                <Link to={'/'}>
                    <GoHomeFill size={20} />
                    <h2 className={`${open && 'hidden'
                        }
                  absolute left-48 bg-white font-semibold whitespace-pre
                  text-green-600 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-200 group-hover:w-fit bottom-7 -translate-x-8 `}>
                        STUDENT HOME
                    </h2></Link></div>

    }

    // return <>{message}</>



    return (
        <>
            <div className={`flex ${open ? "gap-1" : "gap-4"} bg-myBG`}>

                <aside className={'z-10'}>
                    <div
                        className={`sticky top-0 min-h-screen bg-primary ${open ? 'w-[320px] rounded-[35px] border-[16px] border-myBG' : 'w-16 rounded-r-3xl'}
            duration-200 text-gray-100 px-4 relative  `}>

                        <div className={`py-3 flex justify-between items-center pt-5 `}>
                            <h2 className={`font-bold font-roboto text-3xl pl-3 ${!open && "hidden"}`}>Your Options</h2>
                            <HiMenuAlt3
                                size={40}
                                className={`cursor-pointer ml-1 font-bold ${!open && "hidden"} p-1 hover:bg-pinky rounded-md `}
                                onClick={() => setOpen(!open)}
                            />
                            <HiMenu
                                size={40}
                                className={`cursor-pointer ml-1 font-bold ${open && "hidden"} hover:bg-pinky rounded-md `}
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

                        <div className='mt-3 flex flex-col gap-2 relative'>
                            {
                                menus?.map((menu, i) =>
                                    <Link to={menu?.link} key={i}
                                        onClick={() => handleLinkClick(menu?.link)}
                                        className={`group flex items-center text-medium gap-3.5 font-medium p-3.5 rounded-md 
                     hover:bg-pinky hover:scale-95
                      ${activeLink === menu?.link ? 'hover:shadow-xl scale-105 shadow-lg bg-pinky' : ''}
                    active:scale-105 active:shadow-xl focus:hover:shadow-xl focus:scale-105 focus:shadow-lg focus:bg-pinky`}>
                                        <div className={`font-bold ${!open && "-translate-x-2"} `}>{React.createElement(menu?.icon, { size: "20" })}</div>

                                        <h2
                                            style={{
                                                transitionDelay: `${i + 3}00ms`
                                            }}
                                            className={`whitespace-pre duration-300
                  ${!open && "opacity-0 translate-x-28 overflow-hidden"} `}>{menu?.name}
                                        </h2>

                                        <h2 className={`${open && 'hidden'
                                            }
                  absolute left-48 bg-myBG font-semibold whitespace-pre
                  text-primary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-200 group-hover:w-fit
                  
                  `}>
                                            {menu?.name}
                                        </h2>

                                    </Link>
                                )
                            }
                        </div>

                        {userRole}

                    </div>
                </aside>

                <main className='m-3 text-xl text-gray-900 font-semibold w-full '>
                    <div className=' min-h-full relative '>
                        <nav className='h-28 w-full bg-myBG border sticky -top-1 -mt-4 pt-1.5'>
                            <div
                                className={`flex justify-between items-center max-w-[1500px] mt-8`}>
                                <h2
                                    className={` font-bold font-roboto text-2xl md:text-3xl lg:text-[38px] text-left text-primary md:leading-[46px] leading-8`}>
                                    CSE Lab Inventory<br className='sm:hidden' />  Management System</h2>

                                <ul className="flex flex-wrap  justify-between gap-2 mr-10">
                                    <Link to={''}
                                        onClick={() => handleLinkClick('')}
                                        className={`group flex md:items-center font-medium gap-1  rounded-full  p-3 justify-center
                     hover:scale-110 text-sm focus:border-2
                    active:scale-105 active:shadow-xl hover:shadow-xl focus:scale-125 focus:shadow-lg  text-myText `}>
                                        <div className={`font-bold`}>{React.createElement(FaEnvelope, { size: "18" })}</div>

                                        {/* <h2
                      className={`whitespace-pre duration-300 hidden md:block`}>Message
                    </h2> */}
                                    </Link>
                                    <li >
                                        <Link to={''}
                                            onClick={() => handleLinkClick('')}
                                            className={`group flex md:items-center font-medium gap-1 rounded-full  p-3 justify-center
                     text-sm  hover:scale-110
                    active:scale-105 active:shadow-xl hover:shadow-xl focus:scale-125 focus:shadow-lg  text-myText `}>
                                            <div className={`font-bold`}>{React.createElement(FaUserAlt, { size: "18" })}</div>

                                            {/* <h2
                        className={`whitespace-pre duration-300 hidden md:block`}>1905099
                      </h2> */}
                                        </Link>
                                    </li>

                                </ul>

                            </div>
                        </nav>



                        <footer className='bg-myBG border sm:h-16 w-full absolute -bottom-2'>
                            <div
                                className={`flex flex-wrap sm:justify-between items-center max-w-[1240px] ${open ? 'mx-7' : 'mx-auto'}  text-gray-500 font-normal text-base mt-5`}>
                                <h2 className=' ml-16 sm:ml-0'> © {new Date().getFullYear()}
                                    <a href="https://www.buet.ac.bd/web/#/" className="font-bold hover:text-primary text-myText" target="_blank">    &nbsp;BUET&nbsp; </a>
                                    All Rights Reseverd.</h2>

                                <ul className="flex justify-between gap-5 ml-5 sm:ml-0">
                                    <li>
                                        <a href="https://cse.buet.ac.bd/" target="_blank" className='hover:text-primary'>Department of CSE</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" target="_blank" className='hover:text-primary'>About
                                            Us</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" target="_blank" className='hover:text-primary'>Blog</a>
                                    </li>
                                    <li >
                                        <a href=""
                                            target="_blank" className='hover:text-primary'>Contact</a>
                                    </li>
                                </ul>

                            </div>
                        </footer>
                    </div>

                </main>
            </div>
        </>
    )
}

export default StudentHome
