/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect,  useState } from "react";

export const UserContext = createContext(null);
const ContextProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(null);

    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/me`, {withCredentials: true}).then(res =>setLoggedUser(res.data));
        setLoading(false)
    },[])
    if(loading) return <div className="">Loading...</div>
    return (
        <UserContext.Provider value={{loggedUser, setLoggedUser, loading,setLoading,}}>
            {children}
        </UserContext.Provider>
    );
};



export default ContextProvider;







