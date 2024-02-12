import { useEffect, useState } from "react";

import { useStorageContext } from "../../context/StorageContext";
import { ACTION } from "../../context/StorageContext";
import { useAuthContext } from "../../context/AuthContext";
import Card from "../../components/Card";

export function ContentHomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { storage, dispatch } = useStorageContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`/api/equipments/${user.username}`);

        const json = await response.json();

        console.log(json);

        if (response.ok) {
          dispatch({ type: ACTION.SET_STORAGE, payload: json });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, [user.username, dispatch]);

  return (
    <div className=" my-2 min-h-screen">
      <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5">
        <div className="relative flex w-full gap-2 md:w-max">
          <h2 className="text-left text-myText ml-5 text-2xl font-bold">
            Your Lab Equipments
          </h2>
          <div className="relative h-10 w-full min-w-[288px] ">
            <input
              type="search"
              //value={searchTerm}
              //onChange={handleSearch}
              className={`peer h-full w-full rounded-[7px] border border-primary  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-myText outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:shadow-2xl 
      ${searchTerm === "" ? "border-t-primary" : "border-t-transparent"}`}
              placeholder=" "
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-myText  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-primary before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-primary after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Type here...
            </label>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-4 justify-between w-full p-5 border text-left md:gap-4 lg:gap-5 xl:gap-7">
        {storage &&
          storage
            .filter((equipment) =>
              equipment.equipment_name
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase())
            )
            .map((equipment) => (
              <Card key={equipment.equipment_id} equipment={equipment} />
            ))}
      </div>
    </div>
    // <div>
    //   <div className="ml-96 mt-14">
    //     <input
    //       type="text"
    //       placeholder="Search..."
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
    //     />
    //   </div>
    //   <div className="p-2 ml-56 ">
    //     {storage &&
    //       storage
    //         .filter((equipment) =>
    //           equipment.equipment_name
    //             .toLowerCase()
    //             .startsWith(searchTerm.toLowerCase())
    //         )
    //         .map((equipment) => (
    //           <Card key={equipment.equipment_id} equipment={equipment} />
    //         ))}
    //   </div>
    // </div>
  );
}
