export const useLogin = () => {
  const login = async (username, password) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseJSON = await response.json(); //now responeJSON is {username, role, token} a json obj

    // console.log("from uesLogin hook");
    // console.log(responseJSON);

    return responseJSON;
  };

  return { login };
};
