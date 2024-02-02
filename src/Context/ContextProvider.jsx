/* eslint-disable react/prop-types */
import { createContext, useEffect,  useState } from "react";

export const UserContext = createContext(null);
const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        const userData = localStorage.getItem('loggedUser');
        setUser(JSON.parse(userData));
        setLoading(false)
    },[])
    if(loading) return <div className="">Loading...</div>
    return (
        <UserContext.Provider value={{user, loading,setLoading,setUser}}>
            {children}
        </UserContext.Provider>
    );
};



export default ContextProvider;







