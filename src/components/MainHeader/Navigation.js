import React, { useContext, useState } from "react";
import styles from './Navigation.module.css'
import Button from "../UI/Button/Button";

import AuthContext from '../../context/auth-context'

import SignUpModal from '../UI/Modal/SignUpModal'
import LoginModal from "../UI/Modal/LoginModal";

import { db } from '../../config/firebase-config'
import { doc, getDoc } from "firebase/firestore";



const getCurrentUser = async (currentUser) => {
    const docRef = doc(db, "USERS_INFO", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().username;
    }
}


const Navigation = () => {


    const [signUpState, setSignUpState] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const [userName, setUserName] = useState('');
    const signUpHandler = () => {
        setSignUpState(true);
    }
    const LoginHanler = () => {
        setLoginState(true)
    }
    const onConfirmHandler = () => {
        setSignUpState(false);
        setLoginState(false);
    }
    const ctx = useContext(AuthContext);
    //because getCurrentUser return a [object Promise] => use .then to solve
    getCurrentUser(ctx.currentUser).then(name => {
        setUserName(name);
    })
    return (
        <React.Fragment>
            {signUpState && <SignUpModal onConfirm={onConfirmHandler}></SignUpModal>}
            {loginState && <LoginModal onConfirm={onConfirmHandler} ></LoginModal>}
            <nav className={styles["nav"]}>
                <ul>
                    {ctx.isLoggedIn &&
                        <li><a href="#">{`${userName}`}</a></li>
                    }
                    {ctx.isLoggedIn &&
                        <li><a href="#">Setting</a></li>
                    }
                    {!ctx.isLoggedIn &&
                        <li><Button className={styles["btn"]} onClick={signUpHandler}>Sign Up</Button></li>
                    }
                    {ctx.isLoggedIn === false ?
                        <li><Button className={styles["btn"]} onClick={LoginHanler}>Log In</Button></li> :
                        <li><Button className={styles["btn"]} onClick={ctx.onLogout}>Log Out</Button></li>
                    }
                </ul>
            </nav>
        </React.Fragment>
    )
}
//we need to put Button inside a li tag because in css we have margin left on the li tag

export default Navigation;