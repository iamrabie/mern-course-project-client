import { createContext , useState , useEffect } from "react";

export const UserContext = createContext({
    user:null,
    token:null,
    setUser:() => null
});


export const UserProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [token , setToken] = useState(null);
    // console.log('token from user context ::::' , token);
    const value={user, setUser , token , setToken};

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}