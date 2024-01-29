import { useAuthContext } from "../context/AuthContext";
import { AUTH_ACTION } from "../context/AuthContext";

export const useRegister = () => {
  const { dispatch } = useAuthContext();

  const register = async (user) => {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseJSON = await response.json(); //now responeJSON is {username, role, token} a json obj

    await dispatch({ type: AUTH_ACTION.LOGIN, payload: responseJSON });

    return responseJSON;
  };

  return { register };
};
