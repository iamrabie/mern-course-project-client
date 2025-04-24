import { createContext , useState } from "react";

export const UserContext = createContext({
    user:null,
    token:null,
    setUser:() => null
});


export const UserProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [token , setToken] = useState(null);
    const value={user, setUser , token , setToken};

    // console.log('user context :' , user);
    // console.log('value' , value);

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}