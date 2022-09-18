import React from "react";
import styles from './PopUp.module.css'
import Button from "../Button/Button";
const Content = (props) => {
    return (<div className={styles.notificationContent}>
        {props.isError && <h1 className={styles.title}>Something Went Wrong!</h1>}
        {!props.isError && <h1 className={styles.title}>Success!</h1>}
        {props.isError && <p className={styles.notificationDescription}>{`${props.errorDescription}`}</p>}
        {!props.isError && <p className={styles.notificationDescription}>{`${props.contentDescription}`}</p>}
        {props.isError && <Button className={`${styles.btn} ${styles.borderRed}`} onClick={props.onClick}>OK</Button>}
        {!props.isError && <Button className={`${styles.btn} ${styles.borderGreen}`} onClick={props.onClick}>OK</Button>}
    </div>)
}
export default Content;