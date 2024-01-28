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
    <div className="bg-yellow-100 py-[150px]">
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <div>
            <label>Username: </label>
            <input type="text" ref={usernameRef} />
          </div>

          <div>
            <label>Password: </label>
            <input type="password" ref={passwordRef} />
          </div>

          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
