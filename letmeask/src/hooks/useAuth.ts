import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


export function useAuth(){
    const value = useContext(AuthContext);

    return value
}