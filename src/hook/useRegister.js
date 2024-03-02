import { useAuthContext } from "../context/AuthContext";
import { AUTH_ACTION } from "../context/AuthContext";

import { useState } from "react";

export const useRegister = () => {
  const { dispatch } = useAuthContext();

  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);

  const register = async (user) => {
    seterror(null);
    setloading(true);

    const response = await fetch("/api/user/signup", {
      //have to change the route here.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseJSON = await response.json(); //now responeJSON is {username, role, token} a json obj

    if (!response.ok) {
      setloading(false);
      seterror(responseJSON.error);
    } else {
      dispatch({ type: AUTH_ACTION.LOGIN, payload: responseJSON });

      setloading(false);
    }
    await dispatch({ type: AUTH_ACTION.LOGIN, payload: responseJSON });

    return responseJSON;
  };

  return { register, error, loading };
};
