import React, { useState } from "react";

export function ProductDetail(props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Lab 1", "Lab 2", "Lab 3"];

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

  return (
    <div className="flex-col items-center justify-center w-screen">
      <div className="mx-auto bg-white p-4 rounded-md shadow-md ">
        inventory
      </div>
      <div className="mx-auto bg-white p-4 rounded-md shadow-md">
        <img
          src="https://cdn.sparkfun.com/assets/learn_tutorials/4/7/12615-02_Full_Size_Breadboard_Split_Power_Rails.jpg" // Replace with the actual image URL
          alt="Product"
          className="w-full h-40 object-cover mb-4 rounded-md"
        />

        <h1 className="text-3xl font-bold mb-2 text-left pl-6">Breadboard</h1>
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
                <strong>Status:</strong> &nbsp; Available
              </li>
              <li>
                <strong>Stock:</strong> &nbsp; 10
              </li>
              <li>
                <strong>Borrowed:</strong> &nbsp; 2
              </li>
            </ul>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-600"
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
                className="block text-sm font-medium text-gray-600"
              >
                <strong>Location</strong>
              </label>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between focus:outline-none focus:ring focus:border-blue-300"
                >
                  {selectedOption || "Select an option"}
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <ul>
                      {options.map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              className="text-white bg-red-600 rounded-lg px-4  py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl "
              onClick={() => console.log("Add to Cart clicked")}
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
              className="text-white bg-red-600 rounded-lg px-4  py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl mt-5"
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
