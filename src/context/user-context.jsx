import { createContext , useState , useEffect } from "react";

export const UserContext = createContext({
    user:null,
    token:null,
    setUser:() => null
});


export const UserProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [token , setToken] = useState(null);
    console.log('token from user context ::::' , token);
    const value={user, setUser , token , setToken};

        
    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("token"));

        if (storedToken){
         setToken(storedToken.token);
        }

    } , []);
    // console.log('user context :' , user);
    // console.log('value' , value);

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}