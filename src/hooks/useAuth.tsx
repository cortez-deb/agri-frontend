import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth=()=>{
    const {Auth,setAuth}=useContext(AuthContext)
    return {Auth,setAuth}
}
export default useAuth