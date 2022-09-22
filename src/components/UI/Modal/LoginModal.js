//REACT
import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
//COMPONENTS
import Card from "../Card/Card";
import Input from "../Input/Input";
import Header from "../Header/Header";
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";
//CONTEXT
import AuthContext from "../../../context/auth-context";
//FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebase-config";
//CSS
import styles from './formModal.module.css'

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onConfirm}></div>
}


const Modal = (props) => {
    const authCtx = useContext(AuthContext);
    const emailRef = useRef()
    const passwordRef = useRef()

    const [isError, setErrrorState] = useState(false);
    const [signInLock, setLockState] = useState(false);
    const [onClick, setClicked] = useState(false)
    const [counter, setCounter] = useState(0);
    const SubmitHandler = async (event) => {
        event.preventDefault();
        setClicked(true)
        if (counter > 3) return;
        try {
            await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
            setCounter(0);
            authCtx.onLogin()
            props.onConfirm();
        }
        catch (error) {
            setCounter(counter + 1);
            setErrrorState(true);
        }

    }
    useEffect(() => {
        if (counter > 3) {
            setLockState(true);
        }
        setClicked(false)
    }, [counter, onClick])
    const Handler = () => {
        setErrrorState(false)
        setLockState(false);
    }
    return (
        <Card className={styles.modal}>
            {
                signInLock && ReactDOM.createPortal(
                    <PopUp onClick={Handler} LoggedOutError="Your Account Have Been Temporary Locked. Try Again Later!"></PopUp>
                    , document.getElementById("popup-root"))
            }
            {
                isError && ReactDOM.createPortal(
                    <PopUp onClick={Handler} LoggedOutError="Email Or Password Is Incorrect"></PopUp>
                    , document.getElementById("popup-root"))
            }
            <Header className={styles.modalTitle}>Login</Header>
            <form onSubmit={SubmitHandler}>
                <Input id='email' type='email' ref={emailRef}>Email</Input>
                <Input id='password' type='password' ref={passwordRef}>Password</Input>
                <div className={styles.actions}>
                    <Button className={styles.modalBtn} type="submit" >Login</Button>
                </div>
            </form>
        </Card>
    )
}

const LoginModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm}></Backdrop>, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<Modal onConfirm={props.onConfirm}></Modal>, document.getElementById('overlay-root'))}
        </React.Fragment>
    )
}
export default LoginModal;