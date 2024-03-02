import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useLogin } from "../hook/useLogin";

function Login() {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const responseJSON = await login(username, password);

    if (responseJSON.assigned === 2 || responseJSON.assigned === 0) {
      navigate("/assigned");
    } else if (responseJSON.assigned === 1) {
      if (responseJSON.role === "Inventory Manager") {
        navigate("/manager");
      } else if (responseJSON.role === "Student") {
        navigate("/student");
      } else if (responseJSON.role === "Teacher") {
        navigate("/teacher");
      } else if (responseJSON.role === "Lab Assistant") {
        navigate("/labassistant");
      } else if (responseJSON.role === "Super Admin") {
        navigate("/admin");
      } else if (responseJSON.role === "Department Head") {
        navigate("/head");
      }
    }

    // console.log("there shoudl set the user");
    // console.log(responseJSON.role);

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: 'url("bg_2.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
            <div className="bg-red-800 p-4 rounded-xl mb-3">
              <h2 className="text-2xl font-bold mb-2 text-center text-white">
                CSE Lab Inventory <br />
                Management System
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="text-sm">
              <div className="mb-4 mt-12 ">
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
              {error && (
                <div
                  className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {error}</span>
                </div>
              )}

              <button
                type="submit"
                className="text-white text-sm bg-red-600 rounded-lg px-4 ml-32 py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl "
                disabled={loading}
              >
                LOG IN
              </button>

              <p className="mt-4 text-sm text-center text-gray-400">
                Don't have an account?
                <Link to="/signup" className="font-bold text-red-600 ml-2">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
