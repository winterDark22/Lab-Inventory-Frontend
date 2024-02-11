<aside className={`z-20`}>
    <div
        className={`sticky top-0 min-h-screen bg-primary ${open ? 'w-[320px] rounded-[30px] border-[16px] border-myBG' : 'w-16 '} ${!showModalNotification && 'rounded-r-3xl'}
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
                        onClick={
                            () => handleLinkClick(menu?.link, menu?.name)

                        }
                        className={`group flex items-center text-medium gap-3.5 font-medium p-3.5 rounded-md 
                     hover:bg-pinky hover:scale-95
                      ${activeLink === menu?.link ? 'hover:shadow-xl scale-105 shadow-lg bg-pinky' : ''}
                    active:scale-105 active:shadow-xl focus:hover:shadow-xl focus:scale-105 focus:shadow-lg focus:bg-pinky  transition duration-100`}>
                        <div className={`font-bold ${!open && "-translate-x-2"} `}>{React.createElement(menu?.icon, { size: "20" })}</div>

                        <h2
                            style={{
                                transitionDelay: `${i + 1}00ms`
                            }}
                            className={`whitespace-pre duration-300
                  ${!open && "opacity-0 translate-x-28 overflow-hidden"} `}>{menu?.name}  {menu?.name === 'Notifications' && <span className='bg-white text-primary px-2 rounded-full'>2</span>}
                        </h2>

                        <h2 className={`${open && 'hidden'
                            }
                  absolute left-48 bg-myBG font-semibold whitespace-pre
                  text-primary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-200 group-hover:w-fit
                  
                  `}>
                            {menu?.name}  {menu?.name === 'Notifications' && <span className='bg-primary text-myCard px-2 rounded-full'>2</span>}
                        </h2>

                    </Link>
                )
            }

            <div className={`fixed w-full bg-black bg-opacity-50 top-0 left-0 z-30 ${!showModalNotification && "hidden"} `} onClick={() => setShowModalNotification(false)}>
                <div className="flex items-center justify-center min-h-screen  sm:block sm:p-0" onClick={() => setShowModalNotification(false)}>
                    {/* ...rest of the modal code... */}
                    <div className="bg-white ml-[64px] min-h-screen overflow-y-auto text-left overflow-hidden sm:align-middle sm:max-w-lg sm:w-full" onClick={(e) => e.stopPropagation()}>

                    </div>
                </div>
            </div>

        </div>

        {userRole}

    </div>
</aside>