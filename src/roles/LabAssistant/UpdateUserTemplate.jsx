<div className="relative overflow-x-auto sm:rounded-xl m-5 ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-primary">
            <tr className='border-b-[6px] border-myBG'>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Equipment
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Availability
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Borrowed
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            <tr className="bg-myCard border-b-8 border-myBG text-myText">
                <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">

                    <img src="https://www.robotechbd.com/wp-content/uploads/2021/07/frosted-leds-red-green-blue-yellow-white-800x800-1.jpg" className="w-24 md:w-28 rounded-sm sm:rounded-lg hover:scale-105 transition duration-100" alt="LED" />
                </td>
                <td className="px-6 py-4 font-semibold text-center text-base">
                    LED
                </td>
                <td className="px-6 py-4 font-semibold  text-center text-base">
                    50
                </td>
                <td className="px-6 py-4 font-semibold  text-center text-base">
                    10
                </td>
                <td className="px-6 py-4 text-center">
                    <button href="#" className="font-medium text-green-500 hover:scale-105 transition duration-100 text-base">
                        Update
                    </button>
                </td>
            </tr>



        </tbody>
    </table>
</div>