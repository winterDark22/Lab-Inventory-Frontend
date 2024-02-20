import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EquipmentFinder from "../apis/equipmentFinder";
import { useAuthContext } from "../context/AuthContext";

export function ProductDetail(props) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { username, role } = user;

  console.log("from component");
  console.log(role);

  const [equipment, setequipment] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const equipment = await EquipmentFinder.get(`/${id}`);
      setequipment(equipment.data);
    };

    const fetchLocations = async () => {
      const locations = await EquipmentFinder.get(`/${id}/locations`);
      setLocations(locations.data);
      console.log(locations.data);
    };

    fetchData();
    fetchLocations();
  }, []);

  const [quantity, setQuantity] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const options = locations.map((location) => ({
    locationName: location.location_name,
    available: location.available,
    location_id: location.location_id,
  }));

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleButtonClick = async () => {
    //console.log(quantity, selectedOption.location_id);

    const response = await fetch(
      `/api/request/createrequest/${username}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
          location: selectedOption.location_id,
        }),
      }
    );

    const responseJSON = await response.json(); //now responeJSON is {username, role, token} a json obj

    setSelectedOption("");
    setQuantity(0);
    setLocations([]);
  };

  return (
    <div className="flex-col items-center justify-center w-2/3 ml-32">
      <div className="mx-auto bg-white p-4 rounded-md shadow-md">
        <img
          src={equipment && equipment.image_link} // Replace with the actual image URL
          alt="Product"
          className="w-full h-40 object-cover mb-4 rounded-md"
        />

        <h1 className="text-3xl font-bold mb-2 text-left pl-6">
          {equipment && equipment.equipment_name}
        </h1>
        <div className="flex text-left">
          <div className="w-1/2 px-8">
            <h4 className="font-bold text-gray-600">Specifications</h4>
            <ul className="list-disc list-inside ml-5 text-xs text-gray-600">
              <li>
                830 Tie Points: 128 groups of 5 connected terminals, 8 bus of 25
                connected terminals
              </li>
              <li>No soldering required</li>
              <li>Circuit Electronics DIY</li>
              <li>
                Fit for jumper wire of 0.8mm diameter standard 2.54mm hole
                spacing
              </li>
              <li>
                {" "}
                Reusable for fast build a prototype of an electronic circuit
                will accept transistors, diodes, LEDS, resistors, capacitors and
                virtually all types of components
              </li>
            </ul>
            <br />
            <ul className="mb-5 text-gray-600">
              <li>
                <strong>
                  Status:
                  {equipment && equipment.available > 0
                    ? " Available"
                    : " Not available"}
                </strong>{" "}
              </li>
              <li>
                <strong>Stock: {equipment && equipment.available}</strong>{" "}
              </li>
            </ul>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-600 mb-3"
              >
                <strong> Quantity</strong>
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full p-2 border rounded-md"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="dropdown"
                className="block text-sm font-medium text-gray-600 mb-3"
              >
                <strong>Location</strong>
              </label>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="w-full text-base bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between focus:outline-none focus:ring focus:border-blue-300"
                >
                  {selectedOption
                    ? selectedOption.locationName
                    : "Select an option"}
                </button>
                {isOpen && (
                  <div className="absolute top-full text-base left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <ul>
                      {options.map((option) => (
                        <li
                          key={option.locationName}
                          onClick={() => handleOptionClick(option)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-base"
                        >
                          {option.locationName} - {option.available}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              className="text-white bg-red-600 rounded-lg px-4 text-base py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl "
              onClick={handleButtonClick}
            >
              Request
            </button>
          </div>
          <div className="w-1/2 px-8">
            <h4 className="font-bold text-gray-600">General Information</h4>
            <p className="text-sm text-gray-600">
              The economic Arduino Uno R3 incorporates all the fundamental
              features and functionalities of its original variant while
              addressing the needs of budget-conscious individuals, educational
              institutions, and hobbyists. Designed with a focus on cost
              optimization, this variant offers an accessible entry point to the
              Arduino ecosystem without compromising on quality or reliability.
              While maintaining the core specifications and compatibility of the
              Arduino Uno R3, the economic version presents a streamlined design
              that maximizes cost efficiencies without sacrificing essential
              capabilities. It features a robust microcontroller unit, reliable
              power management, and a range of digital and analog input/output
              pins. These provisions allow users to interface with an extensive
              array of sensors, actuators, and communication modules, making it
              an ideal choice for a diverse range of projects. The economic
              Arduino Uno R3 is fully compatible with the Arduino software
              environment, which provides an intuitive and user-friendly
              programming interface. This enables users, regardless of their
              expertise level, to easily write and upload code to the
              microcontroller board, empowering them to bring their ideas to
              life. CHECK OUT THE HIGHER QUALITY VARIANT OF ARDUINO UNO R3
            </p>
            <button
              className="text-white bg-red-600 rounded-lg px-4 text-sm  py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl mt-5"
              onClick={() => console.log("Add to Cart clicked")}
            >
              Download Usage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
