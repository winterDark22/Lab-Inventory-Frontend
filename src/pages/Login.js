import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hook/useLogin";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const responseJSON = await login(username, password);

    console.log("there shoudl set the user");
    console.log(user);

    if (responseJSON.role === "inventory manager") {
      navigate("/manager");
    } else if (responseJSON.role === "Student") {
      navigate("/student");
    }

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <img
        src="https://cdn.sparkfun.com/assets/learn_tutorials/4/7/12615-02_Full_Size_Breadboard_Split_Power_Rails.jpg"
        alt="profile_image"
        class="rounded w-28  shadow-sm"
      />
      <div className="min-h-screen flex items-center justify-center bg-cover">
        <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
          <div className="bg-red-600 p-5 rounded-xl mb-3">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              CSE Lab Inventory <br />
              Management System
            </h2>
          </div>
          <h3 className="text-center text-2xl font-bold mb-4 text-gray-600">
            Log In
          </h3>
          <h3 className="text-center  mb-6 text-gray-400">
            Enter Your Information to Log in
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-lg"
                placeholder="Enter your username"
                ref={usernameRef}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-lg "
                placeholder="Enter your password"
                ref={passwordRef}
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
              <a href="" className="font-bold text-red-600">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
