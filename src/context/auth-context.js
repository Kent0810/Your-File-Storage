import React, { useState } from "react";
import { signOut } from "firebase/auth"
import { auth } from '../config/firebase-config'
import { onAuthStateChanged, } from "firebase/auth"


const AuthContext = React.createContext({
    currentUser: {},
    isLoggedIn: false, //init state
    onLogout: () => { },
    onLogin: () => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    //IMPORTANT
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user)
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            console.log("No Current User")
        }
    });
    //CHECK IF USER LOGIN HERE
    const loginHandler = () => {
        setIsLoggedIn(true)
    }
    const logoutHandler = async () => {
        await signOut(auth)
        setCurrentUser({})
        setIsLoggedIn(false)
    }
    return (
        <AuthContext.Provider value={{
            currentUser: currentUser,
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>{props.children}</AuthContext.Provider>
    )

}


export default AuthContext