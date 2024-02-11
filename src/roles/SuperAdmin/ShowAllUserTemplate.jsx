<div className=' my-2 min-h-screen rounded-2xl '>

    <div className='flex flex-col justify-start items-start gap-5 mt-7 mr-5'>
        <h2 className='text-left text-myText ml-5 text-2xl font-bold'>Your Lab Equipments</h2>
        <div className='flex items-center justify-between gap-4 ml-5'>
            <button
                onClick={() => handleLinkClick('/')}
                className={`hover:text-myText text-xs uppercase p-3 w-24 rounded-lg text-gray-400 bg-myCard  active:text-myText}`}> All</button>
            <button
                onClick={() => handleLinkClick('/')}
                className={`text-myText text-xs uppercase p-3  rounded-lg hover:text-gray-400 bg-myCard  ${activeLink === '/' ? 'text-gray-400' : ''}`}> Inventory manager</button>
            <button
                onClick={() => handleLinkClick('/')}
                className={`text-myText text-xs uppercase p-3  rounded-lg hover:text-gray-400 bg-myCard  ${activeLink === '/' ? 'text-gray-400' : ''}`}> Lab assistant</button>
            <button
                onClick={() => handleLinkClick('/')}
                className={`text-myText text-xs uppercase p-3 w-24 rounded-lg hover:text-gray-400 bg-myCard  ${activeLink === '/' ? 'text-gray-400' : ''}`}> teacher</button>

            <button
                onClick={() => handleLinkClick('/')}
                className={`text-myText text-xs uppercase p-3 w-24 rounded-lg hover:text-gray-400 bg-myCard  ${activeLink === '/' ? 'text-gray-400' : ''}`}> student</button>


            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className={`text-myText text-xs uppercase p-3 rounded-lg hover:text-gray-400 bg-myCard  focus:outline-none`} placeholder="Category">
                <option selected>all Category</option>
                <option>user name</option>
                <option>location</option>

            </select>


            <div className="relative flex w-full gap-2 md:w-max" >

                <div className="relative h-10 w-full min-w-[288px] ">

                    <input type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        className={`peer h-full w-full rounded-[7px] border border-primary  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-myText outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:shadow-2xl 
                      ${searchTerm === "" ? "border-t-primary" : "border-t-transparent"}`}
                        placeholder=" " />
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-myText  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-primary before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-primary after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Type here...
                    </label>

                </div>

                <button

                    className="!absolute right-1 top-1 select-none rounded-full hover:bg-myCard py-2 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-myText transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button">
                    <div className={`font-bold `}>{React.createElement(IoSearch, { size: "17" })}</div>
                </button>


            </div>

        </div>



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
                        current location
                    </th>


                    <th scope="col" className="px-6 py-3 text-center">
                        change Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>


            </thead>
            <tbody>

                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                    <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">

                        <td className="px-6 py-4 font-semibold text-base">
                            1905091
                            <p className='text-sm font-normal text-gray-500'>sadia91@gamil.com</p>
                        </td>
                    </td>
                    <td className="px-6 py-4 font-semibold text-center text-base">
                        LED
                    </td>
                    <td className="px-6 py-4 font-semibold text-center text-base">
                        Lab 1
                    </td>

                    <td className="px-6 py-4 text-center">

                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className={`text-myText text-base  p-3 rounded-lg hover:text-gray-400 bg-myCard  focus:outline-none`} placeholder="Category">

                            <option>Lab 1</option>
                            <option>Lab 2</option>

                        </select>
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




</div>