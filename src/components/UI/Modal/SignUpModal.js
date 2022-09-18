import React, { useRef, useState, useReducer, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Button from "../Button/Button";
import AuthContext from "../../../context/auth-context";
import styles from './formModal.module.css'



import { doc, setDoc, getDocs, collection } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '../../../config/firebase-config'
import PopUp from "../PopUp/PopUp";





const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onConfirm}></div>
}

const Modal = props => {
    //Ref
    const nameRef = useRef()
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dateRef = useRef();
    //State
    const [formIsValid, setFormIsValid] = useState(false);
    //Context
    const authCtx = useContext(AuthContext)


    const usernameReducer = (prevState, action) => {
        if (action.type === "USER_INPUT_NAME") {
            if (action.val.length < 6) {
                return { value: action.val, errorName: 'Username Is Too Short (Less Than 6)', isValid: false }
            }
            else return { value: action.val, errorName: '', isValid: true }
        }
        return { value: '', errorName: '', isValid: false }
    }

    const emailReducer = (prevState, action) => {
        if (action.type === "USER_INPUT_EMAIL") {
            if (action.val.includes('@') === false) {
                return { value: action.val, errorName: 'Wrong Email Format', isValid: false }
            }
            else return { value: action.val, errorName: '', isValid: true }
        }
        else if (action.type === "USER_INPUT_DUPLICATED_EMAIL") {
            return { value: action.val, errorName: 'Sorry, Email Has Been Used!', isValid: false }
        }
        return { value: '', errorName: '', isValid: false }

    }

    const passwordReducer = (prevState, action) => {
        if (action.type === "USER_INPUT_PW") {
            if (action.val.length < 6) {
                return { value: action.val, errorName: ' Password Is Too Short (Less Than 6)', isValid: false }
            }
            else return { value: action.val, errorName: '', isValid: true }
        }
        return { value: '', errorName: '', isValid: false }

    }

    const [usernameState, dispatchUsername] = useReducer(usernameReducer, { value: '', errorName: '', isValid: false, })
    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', errorName: '', isValid: false, })
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', errorName: '', isValid: false, })

    const validateUserNameHandler = (event) => {
        dispatchUsername({ type: "USER_INPUT_NAME", val: event.target.value })
    }
    const validateEmailHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT_EMAIL", val: event.target.value })
    }
    const validatePassWordHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT_PW", val: event.target.value })
    }

    //Effect
    useEffect(() => {
        //if there's a change in the validity of usernameState or emailState or passwordState
        //is will be checked every 800 miliseconds -> but if the user enter another key => clear the time out
        const identifier = setTimeout(() => {
            setFormIsValid(
                usernameState.isValid && emailState.isValid && passwordState.isValid
            )
        }, 800)
        return () => {
            clearTimeout(identifier)
        };
    }, [usernameState.isValid, emailState.isValid, passwordState.isValid])
    //WE CAN MIX BOTH OF THE USE EFFECT BLOCK INTO ONE, BUT I RATHER KEEP IT AS 2 FOR MORE EASY WAY TO READ IT
    useEffect(() => {
        getDocs(collection(db, "USERS_INFO")).then((informations) => {
            informations.forEach(element => {
                if (emailState.value === element.data().email) {
                    dispatchEmail({ type: "USER_INPUT_DUPLICATED_EMAIL", val: emailState.value })
                }
            });
        })
    }, [emailState.value])

    const [isNotify, setNotificationState] = useState(false);
    const submitHandler = async (event) => {
        event.preventDefault();
        const userData = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            date: dateRef.current.value
        }
        if (formIsValid) {
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            await setDoc(doc(db, "USERS_INFO", auth.currentUser.uid), userData)
            authCtx.onLogin();
        }
        else {
            console.log("ERROR")
        }
        setNotificationState(true)
    }

    const NotificationHandle = () => {
        setNotificationState(false)
        props.onConfirm();
    }
    const LoggedOutError = (emailState.errorName.length === 0) ? ((passwordState.errorName.length === 0) ? usernameState.errorName : passwordState.errorName) : emailState.errorName;
    return (
        <Card className={styles.modal}>
            {isNotify && ReactDOM.createPortal(
                <PopUp onClick={NotificationHandle} LoggedOutError={LoggedOutError} contentDescription="We've sent a confirmation to your email for verifcation!" ></PopUp>
                , document.getElementById("popup-root"))
            }
            <Header className={styles.modalTitle}>Sign Up</Header>
            <form onSubmit={submitHandler}>
                <Input id='name' type='text' ref={nameRef} isRequired={true}>Your Name</Input>
                <Input id='userName' type='text' ref={usernameRef} isRequired={true} value={usernameState.value} onChange={validateUserNameHandler}>User Name</Input>
                <Input id='email' type='email' ref={emailRef} isRequired={true} value={emailState.value} onChange={validateEmailHandler}>Email</Input>
                <Input id='password' type='password' ref={passwordRef} isRequired={true} value={passwordState.value} onChange={validatePassWordHandler}>Password</Input>
                <Input id='birthday' type='date' ref={dateRef} isRequired={true}>Date of Birth</Input>
                <div className={styles.actions}>
                    <Button className={styles.modalBtn} type="submit">Submit</Button>
                </div>
            </form>
        </Card>
    )
}

const SignUpModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm}></Backdrop>, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<Modal onConfirm={props.onConfirm}></Modal>, document.getElementById('overlay-root'))}
        </React.Fragment>
    )
}
export default SignUpModal;