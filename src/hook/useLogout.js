import { useAuthContext } from "../context/AuthContext";
import { AUTH_ACTION } from "../context/AuthContext";
import { useEquipmentsContext } from "../context/EquipmentsContext";
import { useStorageContext } from "../context/StorageContext";

import { ACTION as STORAGE_ACTION } from "../context/StorageContext";
import { ACTION as EQUIPMENT_ACTION } from "../context/EquipmentsContext";

//we have to clear the workouts in workoutsContext when user logs out. otherwise those workouts will be
// shown in the home page as a flash before fetching the new workouts for the new user who has just logged in

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchEquipment } = useEquipmentsContext();
  const { dispatch: dispatchStorage } = useStorageContext();

  const logout = () => {
    dispatch({ type: AUTH_ACTION.LOGOUT });
    dispatch({ type: EQUIPMENT_ACTION.SET_EQUIPMENT, payload: null });
    dispatch({ type: STORAGE_ACTION.SET_STORAGE, payload: null });
  };

  return { logout };
};
