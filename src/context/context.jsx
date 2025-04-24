import { createContext , useState } from "react";

export const AuthContext = createContext({
    isLoggedIn:false,
    login:() => {},
    logout:() => {}
});


export const AuthProvider = ({children}) => {

    const [ login , setLogin ] = useState(false);
    console.log('login CONTEXT :' , login);
    
    const value = {login , setLogin};
    return(
        <>
         <AuthContext.Provider value={value}>
            {children}
         </AuthContext.Provider>
        </>
    );
}