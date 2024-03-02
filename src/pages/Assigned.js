import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useLogin } from "../hook/useLogin";

import { useAuthContext } from "../context/AuthContext";

function Assigned() {

    const { user } = useAuthContext();

    return (
        <div>
            {user.assigned === 0 ? <h1>Registration pending</h1> : user.assigned === 2 ? <h1>Your registration has not been accepted</h1> : <h1>Your location has not been assigned yet</h1>}
        </div>
    );
}

export default Assigned;
