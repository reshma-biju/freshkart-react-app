import {createContext, useState} from "react";

const AuthContext = createContext();

function AuthProvider(props  ) { 
    const [isLoggedIn, setisLoggedIn] = useState(false);
    return(
        <AuthContext.Provider value={[isLoggedIn, setisLoggedIn]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProvider};
export default AuthContext;