import { createContext, useContext, useReducer } from "react";

export const EquipmentsContext = createContext();

export const ACTION = {
  SET_EQUIPMENT: "set-all-workouts",
  ADD_NEW_EQUIPMENT: "create-new-workout",
  //   DELETE_WORKOUT: "delete-a-workout",
};

export function useEquipmentsContext() {
  const context = useContext(EquipmentsContext); //return a obj = { state, dispatch}

  if (!context) {
    throw Error("Equipments must be used inside an EquipmentsContextProvider");
  }
  return context;
}

export function equipmentReducer(state, action) {
  //console.log(Array.isArray(action.payload));
  switch (action.type) {
    case ACTION.SET_EQUIPMENT:
      return {
        //here action.payload contains a list
        equipments: action.payload,
      };
    case ACTION.ADD_NEW_EQUIPMENT:
      return {
        equipments: [action.payload, ...state.equipments],
      };

    default:
      return state;
  }
}

function EquipmentsContextProvider({ children }) {
  const [state, dispatch] = useReducer(equipmentReducer, {
    equipments: [],
  });

  return (
    <EquipmentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EquipmentsContext.Provider>
  );
}

export default EquipmentsContextProvider;
