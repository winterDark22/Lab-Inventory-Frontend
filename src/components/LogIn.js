import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here
        console.log('Login button clicked');
    };

    return (
        <div >

            <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url("./img/images.jpg")' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className='absolute inset-0 flex items-center justify-center'>

                    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md ">
                        <div className='bg-red-600 p-5 rounded-xl mb-3'><h2 className="text-3xl font-bold mb-6 text-center text-white">CSE Lab Inventory <br />Management System</h2></div>
                        <h3 className='text-center text-2xl font-bold mb-4 text-gray-600'>Log In</h3>
                        <h3 className='text-center  mb-6 text-gray-400'>Enter Your Information to Log in</h3>                    <form onSubmit={handleLogin}>
                            <div className="mb-4">

                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 p-2 w-full border rounded-lg"
                                    placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-red-600 rounded-lg px-4  py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl "
                            >
                                LOG IN
                            </button>

                            <p className="mt-4 text-sm text-center">
                                Don't have an account?
                                <a href="" className="font-bold text-red-600">Register</a>
                            </p>
                        </form>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default LoginForm;