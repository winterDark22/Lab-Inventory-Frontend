import React, { useState } from 'react'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here
        console.log('Login button clicked');
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const options = ['Student', 'Lab Assistant', 'Inventory Manager', 'Teacher'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };


    return (
        <div >
            <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("./img/images.jpg")' }}>

                <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
                    <div className='bg-red-600 p-5 rounded-xl mb-3'><h2 className="text-3xl font-bold mb-6 text-center text-white">CSE Lab Inventory <br />Management System</h2></div>


                    <h3 className='text-center text-2xl font-bold mb-4 text-gray-600'>Register</h3>
                    <h3 className='text-center  mb-6 text-gray-400'>Enter Your Information to Register</h3>
                    <form onSubmit={handleLogin}>

                        <div className="mb-4 relative">

                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    type="button"
                                    className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between focus:outline-none  focus:border-red-300"
                                >
                                    {selectedOption || 'Register as'}

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
                                type="email"
                                id="email"
                                className="mt-1 p-2 w-full border rounded-lg"
                                placeholder="First Name"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 w-full border rounded-lg"
                                placeholder="Last Name"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">

                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 w-full border rounded-lg"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                type="email"
                                id="email"
                                className="mt-1 p-2 w-full border rounded-lg"
                                placeholder="Phone Number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                id="password"
                                className="mt-1 p-2 w-full border rounded-lg "
                                placeholder="Confirm password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-red-600 rounded-lg px-4  py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl "
                        >
                            Register
                        </button>

                        <p className="mt-4 text-sm text-center">
                            Already have an account?
                            <a href="" className="font-bold text-red-600">Log In</a>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignIn
