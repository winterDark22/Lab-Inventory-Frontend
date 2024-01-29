import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hook/useRegister";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Student", "Lab Assistant", "Inventory Manager", "Teacher"];

  const navigate = useNavigate();

  const { register } = useRegister();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      const user = {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        role: selectedOption,
        phone_no: phoneNumber,
      };

      const responseJSON = register(user);
      if (responseJSON.role === "inventory manager") {
        navigate("/manager");
      } else if (responseJSON.role === "Student") {
        navigate("/student");
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setUsername("");
      setPhoneNumber("");
      setSelectedOption("");
      setIsOpen(false);
    }

    console.log("Login button clicked");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: 'url("bg_2.jpg")' }}
      >
        <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
          <div className="bg-red-600 p-2 rounded-xl mb-3">
            <h2 className="text-2xl font-bold mb-2 text-center text-white">
              CSE Lab Inventory <br />
              Management System
            </h2>
          </div>

          <form onSubmit={handleLogin} className="text-sm mt-8 px-2">
            <div className="mb-4 relative">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between focus:outline-none  focus:border-red-300"
                >
                  {selectedOption || "Register as"}
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

            <div className="mb-4">
              <input
                type="text"
                id="firstName"
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="lastName"
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                id="phoneNumber"
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-lg "
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 w-full border rounded-lg "
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="text-white text-sm bg-red-600 rounded-lg px-4 ml-32 py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl "
            >
              Register
            </button>

            <p className="mt-4 text-sm text-center">
              Already have an account?
              <Link to="/" className="font-bold text-red-600 ml-2">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
