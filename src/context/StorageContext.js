import { createContext, useContext, useReducer } from "react";

export const StorageContext = createContext();

export const ACTION = {
  SET_STORAGE: "set-all-storage",
  ADD_IN_STORAGE: "add-new-item",
};

export function useStorageContext() {
  const context = useContext(StorageContext); //return a obj = { state, dispatch}

  if (!context) {
    throw Error("Equipments must be used inside an StorageContextProvider");
  }
  return context;
}

export function storageReducer(state, action) {
  //console.log(Array.isArray(action.payload));
  switch (action.type) {
    case ACTION.SET_STORAGE:
      return {
        //here action.payload contains a list
        storage: action.payload,
      };
    case ACTION.ADD_IN_STORAGE:
      return {
        storage: [action.payload, ...state.storage],
      };

    default:
      return state;
  }
}

function StorageContextProvider({ children }) {
  const [state, dispatch] = useReducer(storageReducer, {
    storage: [],
  });

  return (
    <StorageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StorageContext.Provider>
  );
}

export default StorageContextProvider;
