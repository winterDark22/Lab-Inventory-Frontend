import { useRef } from "react";
import { useLogin } from "../hook/useLogin";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    //console.log({ email, password });
    const responeJSON = await login(username, password);

    // console.log("from login page");
    // console.log(responeJSON);

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
