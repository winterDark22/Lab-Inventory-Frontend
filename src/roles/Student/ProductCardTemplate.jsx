<div className='border border-pinky my-2 min-h-screen rounded-2xl '>
    <div className='flex justify-between'>
        <h2 className='text-left text-myText mt-7 ml-5 text-2xl font-bold'>Hardware</h2>
        <div className='flex '>
            <input type="text" placeholder="Type here" className='border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 m-5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner' />
        </div>
    </div>

    <div className='grid xl:grid-cols-3 md:grid-cols-4 justify-between w-full p-5 border text-left md:gap-4 lg:gap-5 xl:gap-7'>


        <div className="xl:col-span-1 overflow-hidden md:col-span-2 h-[450px] bg-myCard border-2 border-gray-300 rounded-2xl shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <div className='h-[250px] bg-white overflow-hidden flex items-center justify-center'>
                <img className="transition hover:scale-105 duration-200 hover:shadow-lg " src="https://www.robotechbd.com/wp-content/uploads/2021/07/frosted-leds-red-green-blue-yellow-white-800x800-1.jpg" alt="" />
            </div>
            <div className="p-5 relative">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-myText dark:text-white">Breadboard</h5>

                <p className="mb-3 text-base text-gray-500 text-pretty ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <Link to={''} onClick={() => { }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:shadow-xl hover:scale-105 active:scale-95 transition duration-100 absolute -bottom-5">
                    Details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>

    </div>




</div>