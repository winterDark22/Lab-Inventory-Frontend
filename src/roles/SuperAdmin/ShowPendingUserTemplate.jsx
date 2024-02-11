<div className=' my-2 min-h-screen rounded-2xl '>
    <div className='flex flex-col justify-start items-start gap-5 mt-7 mr-5'>
        <h2 className='text-left text-myText ml-5 text-2xl font-bold'>Your Lab Equipments</h2>

    </div>



    <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary">
                <tr className='border-b-[6px] border-myBG'>
                    <th scope="col" className="px-6 py-3 text-center">
                        user name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        role
                    </th>

                    <th scope="col" className="px-6 py-3 text-center">
                        Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>


            </thead>
            <tbody>

                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                    <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">

                        <td className="px-6 py-4 font-semibold text-center text-base">
                            1905091
                        </td>
                    </td>
                    <td className="px-6 py-4 font-semibold text-center text-base">
                        LED
                    </td>

                    <td className="px-6 py-4 text-center">

                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className={`text-myText text-xs uppercase p-3 rounded-lg hover:text-gray-400 bg-myCard  focus:outline-none`} placeholder="Category">

                            <option>Lab 1</option>
                            <option>Lab 2</option>

                        </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <button href="#" className="font-medium text-green-500 hover:scale-105 transition duration-100 text-base">
                            Assign
                        </button>
                    </td>
                </tr>



            </tbody>
        </table>
    </div>




</div>
