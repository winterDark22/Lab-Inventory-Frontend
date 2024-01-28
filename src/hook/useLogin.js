import { useAuthContext } from "../context/AuthContext";
import { AUTH_ACTION } from "../context/AuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseJSON = await response.json(); //now responeJSON is {username, role, token} a json obj

    console.log(responseJSON);

    await dispatch({ type: AUTH_ACTION.LOGIN, payload: responseJSON });

    return responseJSON;
  };

  return { login };
};
