import { useAuthContext } from "../context/AuthContext";
import { AUTH_ACTION } from "../context/AuthContext";
import { useState } from "react";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);

  const login = async (username, password) => {
    seterror(null);
    setloading(true);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseJSON = await response.json(); //now responeJSON is {username, role, token} a json obj

    if (!response.ok) {
      setloading(false);
      seterror(responseJSON.error);
    } else {
      console.log("jjjjjjjjjjj");
      console.log(responseJSON);
      await dispatch({ type: AUTH_ACTION.LOGIN, payload: responseJSON });
      setloading(false);
    }
    //console.log(responseJSON);

    return responseJSON;
  };

  return { login, error, loading };
};
