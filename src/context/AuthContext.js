import { useReducer, useContext, createContext, useEffect } from "react";

export const AUTH_ACTION = {
  LOGIN: "login",
  LOGOUT: "logout",
};

export const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext); //return a obj = { state, dispatch}

  if (!context) {
    throw Error("AuthContext must be used inside an AuthContextProvider");
  }
  return context;
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN:
      return {
        user: action.payload, //{username, role, token}
      };

    case AUTH_ACTION.LOGOUT:
      return {
        user: null,
      };

    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //check if there is a user in local storage for the very first time the app is loaded. not
  // every time the state is changed and the component is re-rendered

  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (user) {
  //       dispatch({ type: AUTH_ACTION.LOGIN, payload: user });
  //     }
  //   }, []);

  console.log("State is now ", state);

  //{user: null, dispatch: dispatch}

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
