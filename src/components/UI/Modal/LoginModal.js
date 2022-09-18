import React, { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import Input from "../Input/Input";
import Header from "../Header/Header";
import Button from "../Button/Button";
import styles from './formModal.module.css'

import AuthContext from "../../../context/auth-context";

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../config/firebase-config";


const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onConfirm}></div>
}

const Modal = (props) => {
    const authCtx = useContext(AuthContext);
    const emailRef = useRef()
    const passwordRef = useRef()

    const SubmitHandler = async (event) => {
        event.preventDefault();
        const user = await signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        )
        console.log(user)
        authCtx.onLogin()

        props.onConfirm();

    }
    return (
        <Card className={styles.modal}>
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